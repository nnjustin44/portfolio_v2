import  React  from 'react';
import { dateTime } from "./dateTime.js";
import Button from '@mui/material/Button';
import './App.css';
import {background_pic, profile_pic, skillSet1, skillSet2, skillSet3, skillSet4, resume, githubLink} from './AppConstants.js';


function App() {
  return (
    <div className="App">
      <title>Justin Nguyen Portfolio</title>
      <div className="topHeader">
        
        <div className="nav">
        </div>
        <img src= {background_pic} className="background_pic"></img>
        <img src={profile_pic} className="profile_pic"></img>
          <div className="titleTop">
            Justin Nguyen
          </div>
      </div>

          
          <div className="menu">
            <a href= "skillsetWrapper" className="skillsetNavbar">
              <Button className="btn">Skillset</Button>
            </a> 
            <a href= "bio" className="aboutNavbar">
              <Button className="btn">About</Button>
            </a>
            <a href= "connect" className="connectNavbar">
              <Button className="btn">Connect</Button>
            </a>
            <a
                className = "resumeNavBar"
                href= {resume}
                >
              <Button className="btn">Resume</Button>
            </a>
            <a 
               className="githubNavbar" 
               href={githubLink}
              >
              <Button className="btn">Github</Button>
            </a>
          {/* <p className="dateTime">{dateTime()}</p>  */}
          </div>

          <div className="body">
              <h1 className="skillTitle">
                Skillset
              </h1>
                
              <div className="skillsetWrapper">
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

              <div className="bio"> 
                <h1 className="title">
                About
                </h1>
                <p>Hi! I'm Justin Nguyen, I am a self taught programmer </p>
                <p>in the pursuit of excellence, driven for self growth in software development.</p>
                <p>Honest. Creative. Dedicated.</p>
              </div>

              <div className="connect"> 
                <h1 className="title">
                Connect
                </h1>
                <p>Email: nnjustin44@gmail.com </p>
                <p>·    ·    ·</p>
                <p>404-789-0044</p>
              </div>
        </div>
    </div>

  );
}

export default App;
