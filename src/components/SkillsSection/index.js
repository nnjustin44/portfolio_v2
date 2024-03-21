import React from "react";
import { LINKS } from "../../AppConstants";

const SkillSection = ({ deviceSize }) => {
  return (
    <div className="skillsetWrapper">
      <h1 className={deviceSize}>Skillset</h1>
      <div className="skill">
        <div className="items">REACT</div>
        <div className="items">REDUX</div>
        <div className="items">TYPESCRIPT</div>
        <div className="items">JAVASCRIPT</div>
        <div className="items">HTML</div>
        <div className="items">CSS</div>
        <div className="items">C#</div>
        <div className="items">.NET CORE</div>
        <div className="items">SQL</div>
        <div className="items">GIT</div>
      </div>
    </div>
  );
};

export default SkillSection;
