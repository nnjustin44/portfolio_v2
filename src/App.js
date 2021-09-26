import  React  from 'react';

import Button from '@mui/material/Button';
import './App.css';
import {background_pic, profile_pic,skillSet1,skillSet2,skillSet3,skillSet4} from './AppConstants.js';


function App() {
  return (
    <div className="App">
        <div className="topHeader">
          
        <div className="nav">
          hello
        </div>
          <img src= {background_pic} className="background_pic"></img>
          <img src={profile_pic} className="profile_pic"></img>
        </div>

          
          <div className="title">
            SKILLSET
          </div>

          <div className="body">

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
          <div>
            <p>
              <a
                className="codelink"
                href="https://github.com/nnjustin44/portfolio"
              >
              <Button className="Resume">Resume</Button>
              </a>
              <a
                className="codelink"
                href="https://github.com/nnjustin44/portfolio"
              >
              <Button className="Resume">Resume</Button>
              </a>
            </p>
          </div>
    </div>

  );
}

export default App;
