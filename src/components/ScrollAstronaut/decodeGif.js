// Decode GIF frames explicitly: drawing an animated <img> to canvas can return
// only its first frame, even while the browser animates the original image.
export function decodeGif(buffer) {
  const bytes = new Uint8Array(buffer);
  let cursor = 6;
  const byte = () => bytes[cursor++];
  const word = () => byte() | (byte() << 8);
  const width = word();
  const height = word();
  const packed = byte();
  byte(); byte();
  const palette = (size) => {
    const colors = bytes.slice(cursor, cursor + size * 3);
    cursor += size * 3;
    return colors;
  };
  const globalColors = packed & 128 ? palette(2 ** ((packed & 7) + 1)) : null;
  const blocks = () => {
    const result = [];
    let length;
    while ((length = byte())) {
      for (let i = 0; i < length; i++) result.push(byte());
    }
    return result;
  };
  let pixels = new Uint8ClampedArray(width * height * 4);
  let control = { disposal: 0, delay: 100, transparent: -1 };
  const frames = [];
  while (cursor < bytes.length) {
    const marker = byte();
    if (marker === 0x3b) break;
    if (marker === 0x21) {
      const label = byte();
      if (label === 0xf9) {
        byte();
        const flags = byte();
        const delay = word() * 10;
        const transparent = byte();
        byte();
        control = { disposal: (flags >> 2) & 7, delay: Math.max(20, delay || 100), transparent: flags & 1 ? transparent : -1 };
      } else blocks();
      continue;
    }
    if (marker !== 0x2c) throw new Error("Invalid GIF frame");
    const left = word();
    const top = word();
    const frameWidth = word();
    const frameHeight = word();
    const flags = byte();
    const colors = flags & 128 ? palette(2 ** ((flags & 7) + 1)) : globalColors;
    const minimum = byte();
    const compressed = blocks();
    const clear = 1 << minimum;
    const end = clear + 1;
    let dictionary;
    let codeSize;
    let next;
    let previous;
    const reset = () => {
      dictionary = Array.from({ length: clear }, (_, i) => [i]);
      codeSize = minimum + 1;
      next = end + 1;
      previous = null;
    };
    reset();
    let bit = 0;
    const indices = [];
    while (bit + codeSize <= compressed.length * 8) {
      let code = 0;
      for (let i = 0; i < codeSize; i++, bit++) code |= ((compressed[bit >> 3] >> (bit & 7)) & 1) << i;
      if (code === clear) { reset(); continue; }
      if (code === end) break;
      const entry = dictionary[code] || (code === next && previous ? [...previous, previous[0]] : null);
      if (!entry) throw new Error("Invalid GIF compression");
      for (const index of entry) indices.push(index);
      if (previous && next < 4096) {
        dictionary[next++] = [...previous, entry[0]];
        if (next === 1 << codeSize && codeSize < 12) codeSize++;
      }
      previous = entry;
    }
    const saved = control.disposal === 3 ? pixels.slice() : null;
    const rows = [];
    if (flags & 64) {
      for (const [start, step] of [[0, 8], [4, 8], [2, 4], [1, 2]]) {
        for (let row = start; row < frameHeight; row += step) rows.push(row);
      }
    } else for (let row = 0; row < frameHeight; row++) rows.push(row);
    for (let row = 0; row < frameHeight; row++) {
      for (let x = 0; x < frameWidth; x++) {
        const color = indices[row * frameWidth + x];
        if (color === control.transparent || color === undefined) continue;
        const offset = ((top + rows[row]) * width + left + x) * 4;
        pixels[offset] = colors[color * 3];
        pixels[offset + 1] = colors[color * 3 + 1];
        pixels[offset + 2] = colors[color * 3 + 2];
        pixels[offset + 3] = 255;
      }
    }
    frames.push({ pixels: pixels.slice(), duration: control.delay });
    if (control.disposal === 2) {
      for (let row = 0; row < frameHeight; row++) pixels.fill(0, ((top + row) * width + left) * 4, ((top + row) * width + left + frameWidth) * 4);
    } else if (saved) pixels = saved;
    control = { disposal: 0, delay: 100, transparent: -1 };
  }
  return { width, height, frames };
}
