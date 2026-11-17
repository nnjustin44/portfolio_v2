import React, { useCallback, useEffect, useRef, useState } from "react";
import "./styles.scss";
import { decodeGif } from "../ScrollAstronaut/decodeGif";
import { removeBackground } from "../ScrollAstronaut/removeBackground";

const ROCKET_URL = `${process.env.PUBLIC_URL}/assets/saturn-v-scroll.gif`;

function cropTransparentFrame(frame) {
  const { data, width, height } = frame;
  let left = width;
  let right = -1;
  let top = height;
  let bottom = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (data[(y * width + x) * 4 + 3] > 8) {
        left = Math.min(left, x);
        right = Math.max(right, x);
        top = Math.min(top, y);
        bottom = Math.max(bottom, y);
      }
    }
  }

  if (right < left || bottom < top) return frame;
  const padding = 3;
  left = Math.max(0, left - padding);
  right = Math.min(width - 1, right + padding);
  top = Math.max(0, top - padding);
  bottom = Math.min(height - 1, bottom + padding);

  const croppedWidth = right - left + 1;
  const croppedHeight = bottom - top + 1;
  const cropped = new ImageData(croppedWidth, croppedHeight);
  for (let y = 0; y < croppedHeight; y += 1) {
    const sourceStart = ((top + y) * width + left) * 4;
    const sourceEnd = sourceStart + croppedWidth * 4;
    cropped.data.set(data.subarray(sourceStart, sourceEnd), y * croppedWidth * 4);
  }
  return cropped;
}

function RocketAnimation({ onReady }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    let animationFrame;
    let frames = [];
    let frameIndex = 0;
    let nextFrameAt = 0;

    const animate = (time) => {
      const canvas = canvasRef.current;
      if (controller.signal.aborted || !canvas) return;
      if (frames.length && time >= nextFrameAt) {
        const current = frames[frameIndex];
        canvas.width = current.image.width;
        canvas.height = current.image.height;
        canvas.getContext("2d").putImageData(current.image, 0, 0);
        nextFrameAt = time + current.duration;
        frameIndex = (frameIndex + 1) % frames.length;
      }
      animationFrame = window.requestAnimationFrame(animate);
    };

    fetch(ROCKET_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Rocket animation download failed");
        return response.arrayBuffer();
      })
      .then((buffer) => {
        if (controller.signal.aborted || !canvasRef.current) return;
        const decoded = decodeGif(buffer);
        const source = document.createElement("canvas");
        source.width = decoded.width;
        source.height = decoded.height;
        const context = source.getContext("2d", { willReadFrequently: true });
        frames = decoded.frames.map((item) => {
          const image = new ImageData(item.pixels, decoded.width, decoded.height);
          removeBackground(image);
          context.putImageData(image, 0, 0);
          return {
            image: cropTransparentFrame(context.getImageData(0, 0, decoded.width, decoded.height)),
            duration: item.duration,
          };
        });
        onReady?.();
        animationFrame = window.requestAnimationFrame(animate);
      })
      .catch((error) => {
        if (!controller.signal.aborted && error.name !== "AbortError") {
          console.error("Unable to decode rocket animation", error);
        }
      });

    return () => {
      controller.abort();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [onReady]);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}

export default function RocketScrollBar({ hidden = false }) {
  const trackRef = useRef(null);
  const rocketRef = useRef(null);
  const dragOffset = useRef(0);
  const dragging = useRef(false);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const handleReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    document.documentElement.classList.add("rocket-scroll-enabled");
    return () => document.documentElement.classList.remove("rocket-scroll-enabled");
  }, []);

  useEffect(() => {
    let frame;
    const update = () => {
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const nextProgress = maxScroll ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      setProgress(nextProgress);

      const track = trackRef.current;
      const rocket = rocketRef.current;
      if (track && rocket) {
        const travel = Math.max(0, track.clientHeight - rocket.offsetHeight);
        rocket.style.transform = `translate3d(-50%, ${nextProgress * travel}px, 0)`;
      }
      frame = undefined;
    };
    const schedule = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    observer?.observe(document.body);
    observer?.observe(trackRef.current);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [ready]);

  const scrollFromPointer = (clientY) => {
    const track = trackRef.current;
    const rocket = rocketRef.current;
    if (!track || !rocket) return;
    const bounds = track.getBoundingClientRect();
    const travel = Math.max(1, track.clientHeight - rocket.offsetHeight);
    const nextProgress = Math.min(1, Math.max(0, (clientY - bounds.top - dragOffset.current) / travel));
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: nextProgress * maxScroll, behavior: "auto" });
  };

  const startDrag = (event) => {
    const bounds = rocketRef.current.getBoundingClientRect();
    dragging.current = true;
    dragOffset.current = event.clientY - bounds.top;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const drag = (event) => {
    if (dragging.current) scrollFromPointer(event.clientY);
  };

  const stopDrag = (event) => {
    dragging.current = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const jumpTo = (event) => {
    if (event.target === rocketRef.current || rocketRef.current?.contains(event.target)) return;
    dragOffset.current = rocketRef.current.offsetHeight / 2;
    scrollFromPointer(event.clientY);
  };

  return (
    <aside
      className="rocketScrollBar"
      data-ready={ready}
      hidden={hidden}
      aria-label="Page scroll position"
    >
      <div className="rocketScrollBar__track" ref={trackRef} onPointerDown={jumpTo}>
        <button
          type="button"
          className="rocketScrollBar__rocket"
          ref={rocketRef}
          aria-label={`Scroll position ${Math.round(progress * 100)}%`}
          onPointerDown={startDrag}
          onPointerMove={drag}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
        >
          <RocketAnimation onReady={handleReady} />
        </button>
      </div>
    </aside>
  );
}
