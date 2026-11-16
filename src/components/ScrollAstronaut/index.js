import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import { createPortal } from "react-dom";
import TransparentSprite from "./TransparentSprite";

const SPRITE_URL = `${process.env.PUBLIC_URL}/assets/pixel-astronaut-walk.gif`;

const WAVE_URL = `${process.env.PUBLIC_URL}/assets/pixel-astronaut-wave.gif`;
const STAND_URL = `${process.env.PUBLIC_URL}/assets/pixel-astronaut-stand.png`;

export default function ScrollAstronaut({ hidden = false }) {
  const astronaut = useRef(null);

  const greetingActive = useRef(false);
  const parked = useRef(false);
  const positionOffset = useRef(0);
  const [greeting, setGreeting] = useState(false);
  const [docked, setDocked] = useState(false);
  const [waveLoaded, setWaveLoaded] = useState(false);
  const showGreeting = () => { greetingActive.current = true; setGreeting(true); };
  const hideGreeting = () => {
    greetingActive.current = false;
    setGreeting(false);
  };

  const parkAtRight = () => {
    parked.current = true;
    setDocked(Boolean(document.getElementById("jonahSpriteDock")));
    hideGreeting();
    const element = astronaut.current;
    const travel = Math.max(0, window.innerWidth - element.offsetWidth - 24);
    element.style.transform = `translate3d(${travel}px, 0, 0)`;
    element.dataset.side = "right";
    element.dataset.walking = "false";
  };

  useEffect(() => {
    if (hidden) {
      greetingActive.current = false;
      setGreeting(false);
    }
  }, [hidden]);

  useEffect(() => {
    const element = astronaut.current;
    let previousY = window.scrollY;
    let frame;
    let stopTimer;
    const update = () => {
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const y = Math.min(maxScroll, Math.max(0, window.scrollY));
      const travel = Math.max(0, window.innerWidth - element.offsetWidth - 24);
      if (docked) {
        element.dataset.walking = "false";
        element.style.transform = "none";
        element.dataset.side = "right";
      } else if (parked.current) {
        element.style.transform = `translate3d(${travel}px, 0, 0)`;
        element.dataset.side = "right";
      } else if (!greetingActive.current) {
        const x = Math.min(travel, Math.max(0, (maxScroll ? (y / maxScroll) * travel : 0) + positionOffset.current));
        element.style.transform = `translate3d(${x}px, 0, 0)`;
        element.dataset.side = x > travel / 2 ? "right" : "left";
      }
      if (y !== previousY && !parked.current) {
        element.style.setProperty("--facing", y > previousY ? "1" : "-1");
        element.dataset.walking = "true";
        window.clearTimeout(stopTimer);
        stopTimer = window.setTimeout(() => { element.dataset.walking = "false"; }, 150);
      }
      previousY = y;
      frame = undefined;
    };
    const schedule = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(update);
    };
    const resumeWalking = (event) => {
      if (!parked.current) return;
      if (event.type === "keydown" && (!['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key) || event.target.closest?.('input, textarea, [contenteditable="true"]'))) return;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const travel = Math.max(0, window.innerWidth - element.offsetWidth - 24);
      const startingX = docked ? Math.max(0, element.getBoundingClientRect().left - 12) : travel;
      positionOffset.current = startingX - (maxScroll ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) * travel : 0);
      previousY = window.scrollY;
      parked.current = false;
      setDocked(false);
    };
    window.addEventListener("wheel", resumeWalking, { passive: true });
    window.addEventListener("touchmove", resumeWalking, { passive: true });
    window.addEventListener("keydown", resumeWalking);
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    observer?.observe(document.body);
    return () => {
      window.removeEventListener("wheel", resumeWalking);
      window.removeEventListener("touchmove", resumeWalking);
      window.removeEventListener("keydown", resumeWalking);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
      window.clearTimeout(stopTimer);
    };
  }, [docked]);


  const sprite = (
    <div className={`scrollAstronaut${docked ? " scrollAstronaut--docked" : ""}`} hidden={hidden} ref={astronaut} data-greeting={greeting} data-wave-loaded={waveLoaded}>
      <span className="scrollAstronaut__bubble" aria-hidden={!greeting}>Hi Im JONAH!</span>
      <a
        href="#jonahSection"
        onClick={parkAtRight}
        className="scrollAstronaut__character"
        aria-label="Meet JONAH"
        onMouseEnter={showGreeting}
        onMouseLeave={hideGreeting}
        onFocus={showGreeting}
        onBlur={hideGreeting}
      >
        <span className="scrollAstronaut__sprite" aria-hidden="true">
          <TransparentSprite
            animation="walk"
            className="scrollAstronaut__walk"
            src={SPRITE_URL}
          />
          <TransparentSprite className="scrollAstronaut__stand" src={STAND_URL} onLoad={() => { astronaut.current.dataset.loaded = "true"; }} />
        </span>
        <TransparentSprite animation="wave" className="scrollAstronaut__wave" src={WAVE_URL} onLoad={() => setWaveLoaded(true)} />
      </a>
    </div>
  );
  const dock = docked && document.getElementById("jonahSpriteDock");
  return dock ? createPortal(sprite, dock) : sprite;
}
