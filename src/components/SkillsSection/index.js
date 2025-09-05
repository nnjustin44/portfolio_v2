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
        <div className="items">HTML/CSS</div>
        <div className="items">SDLC</div>
        <div className="items">C# .NET CORE</div>
        <div className="items">Docker/Kubernetes</div>
        <div className="items">SQL/Postgres</div>
        <div className="items">GIT</div>
        <div className="items">Java Springboot</div>
      </div>
    </div>
  );
};

export default SkillSection;
