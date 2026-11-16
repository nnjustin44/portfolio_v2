export function removeBackground(frame) {
  const { data, width, height } = frame;
  // Close small breaks in the helmet outline before flood filling. Without
  // this barrier the outside background can leak into the dark visor.
  const radius = Math.max(1, Math.ceil(width / 128));
  const foreground = new Uint8Array(width * height);
  for (let i = 0; i < foreground.length; i++) {
    foreground[i] = data[i * 4 + 3] > 0 && Math.max(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]) > 32 ? 1 : 0;
  }
  const dilated = new Uint8Array(foreground.length);
  const closed = new Uint8Array(foreground.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      outer: for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const xx = x + dx, yy = y + dy;
          if (xx >= 0 && xx < width && yy >= 0 && yy < height && foreground[yy * width + xx]) {
            dilated[y * width + x] = 1;
            break outer;
          }
        }
      }
    }
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let filled = 1;
      outer: for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const xx = x + dx, yy = y + dy;
          if (xx < 0 || xx >= width || yy < 0 || yy >= height || !dilated[yy * width + xx]) {
            filled = 0;
            break outer;
          }
        }
      }
      closed[y * width + x] = filled || foreground[y * width + x];
    }
  }

  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;
  const add = (pixel) => {
    if (visited[pixel]) return;
    visited[pixel] = 1;
    const offset = pixel * 4;
    if (data[offset + 3] === 0 || !closed[pixel]) {
      queue[tail++] = pixel;
    }
  };
  for (let x = 0; x < width; x++) { add(x); add((height - 1) * width + x); }
  for (let y = 0; y < height; y++) { add(y * width); add(y * width + width - 1); }
  while (head < tail) {
    const pixel = queue[head++];
    data[pixel * 4 + 3] = 0;
    if (pixel % width > 0) add(pixel - 1);
    if (pixel % width < width - 1) add(pixel + 1);
    if (pixel >= width) add(pixel - width);
    if (pixel < width * (height - 1)) add(pixel + width);
  }
  return frame;
}
