import React from "react";
import { skillSet1, skillSet2, skillSet3, skillSet4 } from "../../AppConstants";

const SkillSection = () => {
  return (
    <div className="skillsetWrapper">
      <h1 className="skillTitle">Skillset</h1>
      <div>
        <img className="skillSetItem" src={skillSet1}></img>
      </div>
      <div>
        <img className="skillSetItem" src={skillSet2}></img>
      </div>
      <div>
        <img className="skillSetItem" src={skillSet3}></img>
      </div>
      <div>
        <img className="skillSetItem" src={skillSet4}></img>
      </div>
    </div>
  );
};

export default SkillSection;
