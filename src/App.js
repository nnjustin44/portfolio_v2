import React from "react";
import { dateTime } from "./dateTime.js";
import Button from "@mui/material/Button";
// import {
//   PhoneAndroidIcon,
//   MailOutlineIcon,
//   LinkedInIcon,
// } from "@mui/icons-material";

import "./App.css";
import {
  background_pic,
  profile_pic,
  resumeLink,
  githubLink,
} from "./AppConstants.js";
import SkillSection from "./components/SkillsSection/index.js";
import BioSection from "./components/BioSection/index.js";
import ConnectSection from "./components/ConnectSection/index.js";
import ExperienceSection from "./components/ExperienceSection/index.js";
import openInNewTab from "./components/helpers/openNewTab.js";

function App() {
  return (
    <div className="App">
      <title>Justin Nguyen Portfolio</title>
      <div className="topHeader">
        <img src={background_pic} className="background_pic"></img>
        <img src={profile_pic} className="profile_pic"></img>
        <div className="titleTop">Justin Nguyen</div>
      </div>
      <div className="menu">
        <a href="#homeSection" className="skillsetNavbar">
          <Button className="nav-btn">Skillset</Button>
        </a>
        <a href="#bioSection" className="aboutNavbar">
          <Button className="nav-btn">About</Button>
        </a>
        <a href="#experienceSection" className="aboutNavbar">
          <Button className="nav-btn">Experience</Button>
        </a>
        <a href="#connectSection" className="connectNavbar">
          <Button className="nav-btn">Connect</Button>
        </a>
        <a className="resumeNavBar">
          <Button className="nav-btn" onClick={() => openInNewTab(resumeLink)}>
            Resume
          </Button>
        </a>
        <a className="githubNavbar">
          <Button className="nav-btn" onClick={() => openInNewTab(githubLink)}>
            Github
          </Button>
        </a>
      </div>

      <div className="body">
        <section id="homeSection">
          <SkillSection />
        </section>
        <section id="bioSection">
          <BioSection />
        </section>
        <section id="experienceSection">
          <ExperienceSection />
        </section>
        <section id="connectSection">
          <ConnectSection />
        </section>
      </div>
    </div>
  );
}

export default App;
