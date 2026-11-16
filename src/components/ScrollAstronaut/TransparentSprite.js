import React, { useEffect, useRef } from "react";
import { decodeGif } from "./decodeGif";
import { removeBackground } from "./removeBackground";

// Remove only dark pixels connected to the frame edges. Enclosed dark details
// (such as the visor) remain intact, unlike a global black color key.
function drawTransparentFrame(image, canvas) {
  const scale = Math.min(1, 256 / (image.naturalWidth || image.width));
  const width = Math.round((image.naturalWidth || image.width) * scale);
  const height = Math.round((image.naturalHeight || image.height) * scale);
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return;
  context.clearRect(0, 0, width, height);
  context.imageSmoothingEnabled = false;
  context.drawImage(image, 0, 0, width, height);
  const frame = context.getImageData(0, 0, width, height);
  removeBackground(frame);
  context.putImageData(frame, 0, 0);
}

export default function TransparentSprite({ src, className, animation, onLoad }) {
  const source = useRef(null);
  const output = useRef(null);
  useEffect(() => {
    if (!animation || typeof fetch === "undefined") return undefined;
    const controller = new AbortController();
    let frame;
    let prepared = [];
    let index = 0;
    let nextFrame = 0;
    let wasActive = false;
    const tick = (time) => {
      // React clears refs before passive effect cleanup. A queued animation
      // callback may still run in that gap when hover ends.
      if (controller.signal.aborted || !output.current) return;
      const root = output.current.closest(".scrollAstronaut");
      const active = !root?.hidden && (animation === "wave"
        ? root?.dataset.greeting === "true"
        : root?.dataset.walking === "true" && root?.dataset.greeting !== "true");
      if (active && prepared.length) {
        if (!wasActive) { index = 0; nextFrame = 0; }
        if (time >= nextFrame) {
          output.current.dataset.frame = index;
          const current = prepared[index];
          output.current.width = current.image.width;
          output.current.height = current.image.height;
          output.current.getContext("2d").putImageData(current.image, 0, 0);
          nextFrame = time + current.duration;
          index = (index + 1) % prepared.length;
        }
      }
      wasActive = active;
      frame = requestAnimationFrame(tick);
    };
    fetch(src, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error("Sprite download failed");
        return response.arrayBuffer();
      })
      .then(buffer => {
        if (controller.signal.aborted || !output.current) return;
        const decoded = decodeGif(buffer);
        const raw = document.createElement("canvas");
        raw.width = decoded.width;
        raw.height = decoded.height;
        const rawContext = raw.getContext("2d");
        const transparent = document.createElement("canvas");
        prepared = decoded.frames.map(item => {
          rawContext.putImageData(new ImageData(item.pixels, decoded.width, decoded.height), 0, 0);
          drawTransparentFrame(raw, transparent);
          return {
            image: transparent.getContext("2d").getImageData(0, 0, transparent.width, transparent.height),
            duration: item.duration,
          };
        });
        output.current.dataset.frameCount = prepared.length;
        frame = requestAnimationFrame(tick);
      })
      .catch(error => {
        if (!controller.signal.aborted && error.name !== "AbortError") console.error("Unable to decode astronaut animation", error);
      });
    return () => {
      controller.abort();
      cancelAnimationFrame(frame);
    };
  }, [animation, src]);
  return (
    <span className={className}>
      <img className="scrollAstronaut__source" src={src} ref={source} alt="" onLoad={() => {
        if (!source.current || !output.current) return;
        drawTransparentFrame(source.current, output.current);
        onLoad?.();
      }} />
      <canvas ref={output} aria-hidden="true" />
    </span>
  );
}
