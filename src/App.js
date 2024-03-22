import React from "react";
import "./App.scss";
import BioSection from "./components/BioSection/index.js";
import ConnectSection from "./components/ConnectSection/index.js";
import ExperienceSection from "./components/ExperienceSection/index.js";
import SkillSection from "./components/SkillsSection/index.js";
import JONAH from "./components/JONAH";
import MenuHeader from "./components/MenuHeader";

require("dotenv").config();

function App() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  var deviceSize = width <= 1100 ? "mobileTitle" : "title";

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
        <div id="jonahSection">
          <JONAH deviceSize={deviceSize} />
        </div>
        <div id="skillSection">
          <SkillSection deviceSize={deviceSize} id="skillSection" />
        </div>
        <div id="experienceSection">
          <ExperienceSection deviceSize={deviceSize} />
        </div>
        <div id="connectSection">
          <ConnectSection deviceSize={deviceSize} />
        </div>
      </div>
    </div>
  );
}

export default App;
