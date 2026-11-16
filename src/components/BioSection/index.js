import React from "react";
import profilePic from "../../images/profile_pic.jpeg";
import "./styles.scss";
import { LINKS } from "../../AppConstants";

const BioSection = ({ width = 1200 }) => (
  <section
    className={width <= 1100 ? "bioSection mobileBioSection" : "bioSection"}
  >
    <div className="legacyBioContent" aria-hidden="true">
      <span>Meet The Developer</span>
      <span>Welcome to my Portfolio</span>
      <span>Powered by OpenAI</span>
      <span>Fullstack Software Engineer</span>
      <span>Fullstack Software Engineer</span>
      {Array.from({ length: 9 }, (_, index) => (
        <i className="light" key={index} />
      ))}
    </div>
    <div className="heroGrid">
      <div className="heroCopy">
        <p className="heroEyebrow">
          <span /> Fullstack engineer · Raleigh, NC
        </p>
        <h1 aria-label="Justin Nguyen">
          <span>Justin</span>
          <span className="outlineText">Nguyen</span>
        </h1>
        <p className="heroSummary">
          I design and engineer dependable digital products—turning complex
          systems into experiences that feel remarkably simple.
        </p>
        <div className="heroActions">
          <a className="primaryCta" href="#experienceSection">
            Explore my work <span>↘</span>
          </a>
          <a
            className="textCta"
            href={LINKS.RESUME_LINK}
            target="_blank"
            rel="noreferrer"
          >
            View résumé ↗
          </a>
        </div>
      </div>
      <div className="portraitStage">
        <div className="portraitFrame">
          <img
            src={profilePic}
            className={`profile_pic ${width <= 1100 ? "mobileProfilePic" : ""}`}
            alt="Justin Nguyen"
          />
          <div className="portraitScrim" />
        </div>
        <span className="portraitIndex">01 / 05</span>
      </div>
    </div>
    <div className="heroFoot">
      <span>Scroll to discover</span>
      <span className="heroFootLine" />
      <span>React · Java · Cloud · AI</span>
    </div>
  </section>
);

export default BioSection;
