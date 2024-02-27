import React from "react";
import "./App.scss";
import GptApiCall from "./api/chatGPT.js";
import BioSection from "./components/BioSection/index.js";
import ConnectSection from "./components/ConnectSection/index.js";
import ExperienceSection from "./components/ExperienceSection/index.js";
import MenuHeader from "./components/MenuHeader";
import SkillSection from "./components/SkillsSection/index.js";
import profile_pic from "./images/profile_pic.jpeg";
import JONAH from "./components/JONAH";

require("dotenv").config();

function App() {
  const { response } = GptApiCall();
  console.log(response);
  return (
    <div className="App">
      <title>Justin Nguyen Portfolio</title>
      <MenuHeader />
      <div className="topHeader" id="homeSection">
        <div>
          <BioSection />
        </div>
        <div className="imgWrapper">
          <img src={profile_pic} className="profile_pic" />
        </div>
        <JONAH />
      </div>
      <div className="info-body">
        <div id="skillSection">
          <SkillSection id="skillSection" />
        </div>
        <div id="experienceSection">
          <ExperienceSection />
        </div>
        <div id="connectSection">
          <ConnectSection />
        </div>
      </div>
    </div>
  );
}

export default App;
