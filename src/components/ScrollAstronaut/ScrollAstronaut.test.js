import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import ScrollAstronaut from "./index";

test("tracks scroll progress, reverses direction, and stops walking when scrolling stops", () => {
  jest.useFakeTimers();
  Object.defineProperty(document.documentElement, "scrollHeight", { configurable: true, value: 3000 });
  Object.defineProperty(window, "innerHeight", { configurable: true, value: 1000 });
  Object.defineProperty(window, "innerWidth", { configurable: true, value: 1000 });
  Object.defineProperty(window, "scrollY", { configurable: true, writable: true, value: 0 });
  const { container, unmount } = render(<ScrollAstronaut />);
  const sprite = container.firstChild;
  const walk = container.querySelector(".scrollAstronaut__walk img");
  expect(walk).toHaveAttribute("src", "/assets/pixel-astronaut-walk.gif");
  const scrollTo = (y) => act(() => {
    window.scrollY = y;
    window.dispatchEvent(new Event("scroll"));
    jest.advanceTimersByTime(20);
  });
  scrollTo(1000);
  expect(sprite.style.transform).toBe("translate3d(488px, 0, 0)");
  expect(sprite.style.getPropertyValue("--facing")).toBe("1");
  expect(sprite.dataset.walking).toBe("true");
  scrollTo(500);
  expect(sprite.style.transform).toBe("translate3d(244px, 0, 0)");
  expect(sprite.style.getPropertyValue("--facing")).toBe("-1");
  act(() => jest.advanceTimersByTime(200));
  expect(sprite.dataset.walking).toBe("false");
  const character = container.querySelector("a");
  fireEvent.mouseEnter(character);
  expect(sprite.dataset.greeting).toBe("true");
  expect(container.querySelector(".scrollAstronaut__wave")).toBeInTheDocument();
  const pausedPosition = sprite.style.transform;
  scrollTo(750);
  expect(sprite.style.transform).toBe(pausedPosition);
  fireEvent.mouseLeave(character);
  expect(sprite.dataset.greeting).toBe("false");
  expect(sprite.dataset.walking).toBe("true");
  expect(container.querySelector(".scrollAstronaut__wave")).toBeInTheDocument();
  fireEvent.mouseEnter(character);
  act(() => jest.advanceTimersByTime(200));
  fireEvent.mouseLeave(character);
  expect(sprite.dataset.walking).toBe("false");
  scrollTo(-100);
  expect(sprite.style.transform).toBe("translate3d(0px, 0, 0)");
  character.addEventListener("click", event => event.preventDefault());
  fireEvent.click(character);
  expect(sprite.style.transform).toBe("translate3d(976px, 0, 0)");
  scrollTo(1200);
  act(() => jest.advanceTimersByTime(300));
  expect(sprite.style.transform).toBe("translate3d(976px, 0, 0)");
  expect(sprite.dataset.walking).toBe("false");
  fireEvent.wheel(window, { deltaY: -100 });
  scrollTo(1000);
  expect(sprite.style.transform).toBe("translate3d(878.4px, 0, 0)");
  expect(sprite.dataset.walking).toBe("true");
  unmount();
  jest.useRealTimers();
});

// Asset byte decoding is covered separately; component tests exercise UI states.
const originalSpriteFetch = global.fetch;
beforeEach(() => { global.fetch = jest.fn(() => new Promise(() => {})); });
afterEach(() => { global.fetch = originalSpriteFetch; });

test("hides the sprite during chat loading and restores it afterward", () => {
  const { container, rerender } = render(<ScrollAstronaut />);
  const sprite = container.firstChild;
  fireEvent.mouseEnter(container.querySelector("a"));
  rerender(<ScrollAstronaut hidden />);
  expect(sprite).toHaveAttribute("hidden");
  expect(sprite.dataset.greeting).toBe("false");
  rerender(<ScrollAstronaut hidden={false} />);
  expect(sprite).not.toHaveAttribute("hidden");
});

test("clicking docks inside the chat panel until the visitor scrolls again", () => {
  const { container } = render(<><div id="jonahSpriteDock" /><ScrollAstronaut /></>);
  const link = container.querySelector("a");
  link.addEventListener("click", event => event.preventDefault());
  fireEvent.click(link);
  const dock = container.querySelector("#jonahSpriteDock");
  expect(dock.querySelector(".scrollAstronaut--docked")).toBeInTheDocument();
  expect(dock.querySelector(".scrollAstronaut").style.transform).toBe("none");
  expect(dock.querySelector(".scrollAstronaut").dataset.walking).toBe("false");
  fireEvent.wheel(window, { deltaY: -100 });
  expect(dock).toBeEmptyDOMElement();
  expect(container.querySelector(".scrollAstronaut--docked")).not.toBeInTheDocument();
  expect(container.querySelector(".scrollAstronaut")).toBeInTheDocument();
});
