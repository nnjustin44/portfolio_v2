import React, { useEffect } from "react";
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
  var width = window.innerWidth;
  var height = window.innerHeight;

  var deviceSize = width <= 1100 ? "mobileTitle" : "title";

  const handleResize = () => {
    if (window.innerWidth < 1100) {
      window.location.reload();
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

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
