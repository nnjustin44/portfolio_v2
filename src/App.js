import  React  from 'react';
import './App.css';
import {profile_pic} from './AppConstants.js';
import {skillSet1} from './AppConstants.js';
import {skillSet2} from './AppConstants.js';
import {skillSet3} from './AppConstants.js';
import {skillSet4} from './AppConstants.js';

function App() {
  return (
    <div className="App">
      <header>
        <nav className="navbar" role="navigation">

        </nav>
        <div>
          <img src={profile_pic} className="profile_pic"></img>
        </div>
      </header>
        <body>
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
        </body>
    </div>

  );
}

export default App;
