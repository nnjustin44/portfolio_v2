import  React  from 'react';
import './App.css';
import {profile_pic} from './AppConstants.js';
import {skillSet1} from './AppConstants.js';


function App() {
  return (
    <div className="App">
      <header>
        <div>
          <image src={profile_pic}></image>
        </div>
      </header>
        <body>
          <div>   
            <image className="skillSet1" src={skillSet1}></image>
          </div>
          <div>   
            <image className="skillSet2" src={skillSet1}></image>
          </div>
          <div>   
            <image className="skillSet3" src={skillSet1}></image>
          </div>
          <div>   
            <image className="skillSet4" src={skillSet1}></image>
          </div>
        </body>
    </div>

  );
}

export default App;
