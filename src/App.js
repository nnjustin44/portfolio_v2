import React from "react";
import { dateTime } from "./dateTime.js";
import Button from "@mui/material/Button";
// import {
//   PhoneAndroidIcon,
//   MailOutlineIcon,
//   LinkedInIcon,
// } from "@mui/icons-material";

import "./App.css";
import SkillSection from "./components/SkillsSection/index.js";
import BioSection from "./components/BioSection/index.js";
import ConnectSection from "./components/ConnectSection/index.js";
import ExperienceSection from "./components/ExperienceSection/index.js";
import openInNewTab from "./components/helpers/openNewTab.js";
import { LINKS } from "./AppConstants.js";
import GptApiCall from "./api/chatGPT.js";

require("dotenv").config();

function App() {
  const { response } = GptApiCall();
  console.log(response);
  return (
    <div className="App">
      <title>Justin Nguyen Portfolio</title>
      <div className="topHeader" id="homeSection">
        <img src={LINKS.PROFILE_PIC} className="profile_pic" />
        <img src={LINKS.BACKGROUND_PIC} className="background_pic" />
        <div className="titleTop">Justin Nguyen</div>
      </div>
      <div className="menu">
        <a href="#homeSection" className="menuNavbar">
          <Button className="nav-btn">Home</Button>
        </a>
        <a href="#skillSection" className="menuNavbar">
          <Button className="nav-btn">Skillset</Button>
        </a>
        <a href="#bioSection" className="menuNavbar">
          <Button className="nav-btn">About</Button>
        </a>
        <a href="#experienceSection" className="menuNavbar">
          <Button className="nav-btn">Experience</Button>
        </a>
        <a href="#connectSection" className="menuNavbar">
          <Button className="nav-btn">Connect</Button>
        </a>
        <a className="menuNavbar">
          <Button
            className="nav-btn"
            onClick={() => openInNewTab(LINKS.GITHUB_LINK)}
          >
            Github
          </Button>
        </a>
        <a className="menuNavbar">
          <Button
            className="nav-btn"
            onClick={() => openInNewTab(LINKS.RESUME_LINK)}
          >
            Resume
          </Button>
        </a>
      </div>
      <div className="info-body">
        <div id="skillSection">
          <SkillSection id="skillSection" />
        </div>
        <div id="bioSection">
          <BioSection />
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
