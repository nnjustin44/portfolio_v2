import fs from "fs";
import path from "path";
import { decodeGif } from "./decodeGif";
import { removeBackground } from "./removeBackground";

test.each([['walk', 220, 110], ['wave', 205, 215]])("keeps the %s visor opaque in every frame while clearing the backdrop", (action, x, y) => {
  const bytes = fs.readFileSync(path.join(process.cwd(), `public/assets/pixel-astronaut-${action}.gif`));
  const decoded = decodeGif(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
  for (const frame of decoded.frames) {
    const result = removeBackground({ width: decoded.width, height: decoded.height, data: frame.pixels.slice() });
    expect(result.data[(y * decoded.width + x) * 4 + 3]).toBe(255);
    expect(result.data[3]).toBe(0);
  }
});

test("a tiny gap in the helmet outline does not turn its dark interior transparent", () => {
  const width = 12;
  const data = new Uint8ClampedArray(width * width * 4);
  for (let i = 3; i < data.length; i += 4) data[i] = 255;
  for (let y = 3; y <= 8; y++) for (let x = 3; x <= 8; x++) {
    if ((y === 3 || y === 8 || x === 3 || x === 8) && !(y === 3 && x === 5)) {
      data.set([220, 220, 220, 255], (y * width + x) * 4);
    }
  }
  removeBackground({ width, height: width, data });
  expect(data[(6 * width + 6) * 4 + 3]).toBe(255);
  expect(data[3]).toBe(0);
});
