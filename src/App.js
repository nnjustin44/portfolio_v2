import React, { useEffect, useState } from "react";
import "./App.scss";
import BioSection from "./components/BioSection/index.js";
import ConnectSection from "./components/ConnectSection/index.js";
import ExperienceSection from "./components/ExperienceSection/index.js";
import SkillSection from "./components/SkillsSection/index.js";
import JONAH from "./components/JONAH";
import MenuHeader from "./components/MenuHeader";
import AboutJonah from "./components/AboutJonah/index.js";
import ScrollAstronaut from "./components/ScrollAstronaut";
import { MOBILE_BREAKPOINT } from "./AppConstants";

const THEME_STORAGE_KEY = "portfolio-theme";

const getInitialTheme = () => {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme === "dark" ? "dark" : "light";
};

const getViewportSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const requestResizeFrame = (callback) => {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(callback);
  }

  callback();
  return undefined;
};

const cancelResizeFrame = (animationFrameId) => {
  if (animationFrameId && window.cancelAnimationFrame) {
    window.cancelAnimationFrame(animationFrameId);
  }
};

function App() {
  const [viewportSize, setViewportSize] = useState(getViewportSize);
  const [theme, setTheme] = useState(getInitialTheme);
  const [isReady, setIsReady] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const { width, height } = viewportSize;
  const isMobile = width <= MOBILE_BREAKPOINT;
  const deviceSize = isMobile ? "mobileTitle" : "title";

  useEffect(() => {
    document.title = "Justin Nguyen Portfolio";
    const readyTimer = window.setTimeout(() => setIsReady(true), 900);
    return () => window.clearTimeout(readyTimer);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    let animationFrameId;

    function handleResize() {
      cancelResizeFrame(animationFrameId);
      animationFrameId = requestResizeFrame(() => {
        setViewportSize(getViewportSize());
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      cancelResizeFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="App">
      <ScrollAstronaut hidden={chatLoading} />
      <div className={`preloader ${isReady ? "preloader--hidden" : ""}`} aria-hidden="true">
        <span className="preloader__mark">JN<span>.</span></span>
        <span className="preloader__line" />
      </div>
      <MenuHeader
        width={width}
        height={height}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <div className="topHeader" id="homeSection">
        <div className="bioSectionAnchor" id="bioSection">
          <BioSection
            width={width}
            height={height}
            deviceSize={deviceSize}
            id="bioSection"
          />
        </div>
      </div>
      <div className="info-body">
        <div id="skillSection" data-reveal>
          <SkillSection deviceSize={deviceSize} id="skillSection" />
        </div>
        <div id="experienceSection" data-reveal>
          <ExperienceSection deviceSize={deviceSize} />
        </div>
        <div id="jonahSection" data-reveal>
          <JONAH deviceSize={deviceSize} onLoadingChange={setChatLoading} />
        </div>
        <div id="aboutJonahSection" data-reveal>
          <AboutJonah deviceSize={deviceSize} />
        </div>
        <div id="connectSection" data-reveal>
          <ConnectSection deviceSize={deviceSize} />
        </div>
      </div>
    </div>
  );
}

export default App;
