import React from "react";
import { act, render } from "@testing-library/react";
import TransparentSprite from "./TransparentSprite";

jest.mock("./decodeGif", () => ({
  decodeGif: () => ({ width: 1, height: 1, frames: [] }),
}));

const originalFetch = global.fetch;
const originalRaf = window.requestAnimationFrame;
const originalCancel = window.cancelAnimationFrame;
let callbacks;

beforeEach(() => {
  callbacks = [];
  window.requestAnimationFrame = jest.fn(callback => callbacks.push(callback));
  window.cancelAnimationFrame = jest.fn();
  jest.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({});
});

afterEach(() => {
  global.fetch = originalFetch;
  window.requestAnimationFrame = originalRaf;
  window.cancelAnimationFrame = originalCancel;
  jest.restoreAllMocks();
});

test("a queued waving callback is harmless after mouse leave removes its canvas", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, arrayBuffer: async () => new ArrayBuffer(0) });
  const view = render(<TransparentSprite src="wave.gif" animation="wave" />);
  await act(async () => {});
  expect(callbacks).toHaveLength(1);
  const queuedCallback = callbacks[0];
  view.unmount();
  expect(() => queuedCallback(100)).not.toThrow();
  expect(callbacks).toHaveLength(1);
});

test("a late sprite download cannot restart animation after mouse leave", async () => {
  let finishDownload;
  global.fetch = jest.fn(() => new Promise(resolve => { finishDownload = resolve; }));
  const view = render(<TransparentSprite src="wave.gif" animation="wave" />);
  view.unmount();
  await act(async () => {
    finishDownload({ ok: true, arrayBuffer: async () => new ArrayBuffer(0) });
  });
  expect(callbacks).toHaveLength(0);
});
