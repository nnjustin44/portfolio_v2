import React from "react";
import { skillSet1, skillSet2, skillSet3, skillSet4 } from "../../AppConstants";

const SkillSection = () => {
  return (
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
  );
};

export default SkillSection;
