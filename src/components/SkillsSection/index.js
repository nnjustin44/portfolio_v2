import React from "react";

const SkillSection = ({ deviceSize }) => {
  return (
    <div className="skillsetWrapper">
      <div className="sectionIntro"><span>01</span><p>Capabilities</p></div>
      <h1 className={deviceSize} aria-label="Skillset">Tools for turning<br/><em>ideas into impact.</em></h1>
      <div className="skill">
        <div className="items">AI INTEGRATION</div>
        <div className="items">REACT</div>
        <div className="items">NEXT.JS</div>
        <div className="items">TYPESCRIPT</div>
        <div className="items">JAVASCRIPT</div>
        <div className="items">C# .NET CORE</div>
        <div className="items">Java</div>
        <div className="items">SpringBoot</div>
        <div className="items">Quarkus</div>
        <div className="items">REDUX</div>
        <div className="items">HTML/CSS</div>
        <div className="items">SQL/Postgres</div>
        <div className="items">Docker/Kubernetes</div>
        <div className="items">Palantir Foundry / AIP</div>
        <div className="items">GIT</div>
        <div className="items">Software Development Life Cycle</div>
      </div>
    </div>
  );
};

export default SkillSection;
