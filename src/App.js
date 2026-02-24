import React, { useState, useEffect } from "react";
import "./App.scss";
import BioSection from "./components/BioSection/index.js";
import ConnectSection from "./components/ConnectSection/index.js";
import ExperienceSection from "./components/ExperienceSection/index.js";
import SkillSection from "./components/SkillsSection/index.js";
import JONAH from "./components/JONAH";
import MenuHeader from "./components/MenuHeader";
import AboutJonah from "./components/AboutJonah/index.js";

require("dotenv").config();

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  const deviceSize = width <= 1100 ? "mobileTitle" : "title";

  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="App">
      <title>Justin Nguyen Portfolio</title>
      <MenuHeader width={width} />
      <div className="topHeader" id="homeSection">
        <div className="bioSection" id="bioSection">
          <BioSection width={width} deviceSize={deviceSize} id="bioSection" />
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
