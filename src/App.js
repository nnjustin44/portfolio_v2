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
  const { width, height } = viewportSize;
  const isMobile = width <= MOBILE_BREAKPOINT;
  const deviceSize = isMobile ? "mobileTitle" : "title";

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

  return (
    <div className="App">
      <title>Justin Nguyen Portfolio</title>
      <MenuHeader width={width} height={height} />
      <div className="topHeader" id="homeSection">
        <div className="bioSection" id="bioSection">
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
