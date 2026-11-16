import fs from "fs";
import path from "path";
import { decodeGif } from "./decodeGif";

test.each(["walk", "wave"])("decodes distinct %s poses with valid frame timing", (action) => {
  const bytes = fs.readFileSync(path.join(process.cwd(), `public/assets/pixel-astronaut-${action}.gif`));
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  const { width, height, frames } = decodeGif(buffer);
  expect(width).toBeGreaterThan(0);
  expect(height).toBeGreaterThan(0);
  expect(frames.length).toBeGreaterThan(1);
  expect(frames.every(frame => frame.pixels.length === width * height * 4 && frame.duration >= 20)).toBe(true);
  expect(frames.some(frame => !Buffer.from(frame.pixels).equals(Buffer.from(frames[0].pixels)))).toBe(true);
});
