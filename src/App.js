import React, { useEffect, useState } from "react";
import "./App.scss";
import BioSection from "./components/BioSection/index.js";
import ConnectSection from "./components/ConnectSection/index.js";
import ExperienceSection from "./components/ExperienceSection/index.js";
import SkillSection from "./components/SkillsSection/index.js";
import JONAH from "./components/JONAH";
import MenuHeader from "./components/MenuHeader";
import AboutJonah from "./components/AboutJonah/index.js";
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
  const { width, height } = viewportSize;
  const isMobile = width <= MOBILE_BREAKPOINT;
  const deviceSize = isMobile ? "mobileTitle" : "title";

  useEffect(() => {
    document.title = "Justin Nguyen Portfolio";
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
        <div id="skillSection">
          <SkillSection deviceSize={deviceSize} id="skillSection" />
        </div>
        <div id="experienceSection">
          <ExperienceSection deviceSize={deviceSize} />
        </div>
        <div id="jonahSection">
          <JONAH deviceSize={deviceSize} />
        </div>
        <div id="aboutJonahSection">
          <AboutJonah deviceSize={deviceSize} />
        </div>
        <div id="connectSection">
          <ConnectSection deviceSize={deviceSize} />
        </div>
      </div>
    </div>
  );
}

export default App;
