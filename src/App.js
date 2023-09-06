import React from "react";
import { dateTime } from "./dateTime.js";
import Button from "@mui/material/Button";
// import {
//   PhoneAndroidIcon,
//   MailOutlineIcon,
//   LinkedInIcon,
// } from "@mui/icons-material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./App.css";
import {
  background_pic,
  profile_pic,
  skillSet1,
  skillSet2,
  skillSet3,
  skillSet4,
  resumeLink,
  githubLink,
  linkedInLink,
} from "./AppConstants.js";

function App() {
  return (
    <div className="App">
      <title>Justin Nguyen Portfolio</title>
      <div className="topHeader">
        <div className="nav"></div>
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
        <a href="#connectSection" className="connectNavbar">
          <Button className="nav-btn">Connect</Button>
        </a>
        <a className="resumeNavBar" href={resumeLink}>
          <Button className="nav-btn">Resume</Button>
        </a>
        <a className="githubNavbar" href={githubLink}>
          <Button className="nav-btn">Github</Button>
        </a>
        {/* <p className="dateTime">{dateTime()}</p>  */}
      </div>

      <div className="body">
        <section id="homeSection">
          <div className="skillsetWrapper">
            <h1 className="skillTitle">Skillset</h1>
            <div>
              <img className="skillSet1" src={skillSet1}></img>
            </div>
            <div>
              <img className="skillSet2" src={skillSet2}></img>
            </div>
            <div>
              <img className="skillSet3" src={skillSet3}></img>
            </div>
            <div>
              <img className="skillSet4" src={skillSet4}></img>
            </div>
          </div>
        </section>

        <section id="bioSection">
          <div className="bio">
            <h1 className="title">About</h1>
            <p>Hi! I'm Justin Nguyen, I am a self taught programmer.</p>
            <p>
              In the pursuit of excellence, driven for self growth in software
              development.
            </p>
            <p>
              This Portfolio was programmed from scratch using React.js and
              hosted on Google Firebase.
            </p>
            <p>I have been a developer at Fiserv since 2021.</p>
            <p>Honest. Creative. Dedicated.</p>
          </div>
        </section>

        <section id="connectSection">
          <div className="connect">
            <h1 className="title">Connect</h1>
            <div className="connectIcons">
              <MailOutlineIcon />:
              <div className="sub-item"> nnjustin44@gmail.com</div>
            </div>
            <div className="connectIcons">
              <PhoneIphoneIcon />:<div className="sub-item">404-789-0044</div>
            </div>
            <div className="linkedIn">
              <LinkedInIcon />:
              <a href={linkedInLink}>
                <button className="linkedIn-btn">LinkedIn</button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
