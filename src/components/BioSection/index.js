import React from "react";
import profile_pic from "../../images/profile_pic.jpeg";
import "./styles.scss";
import MobileBioSection from "./MobileBio";
const BioSection = ({ width, height }) => {
  const BioSection = () => {
    return (
      <div className="bioSection">
        <h1 className="title">Meet The Developer</h1>
        <div className="bioBody">
          <div className="aboutMe">
            <div className="text">
              My name is Justin Nguyen, I am a self taught programmer.
            </div>
            <div className="text">
              Graduated with a degree in Biology and a direct commissioned
              officer in the United States Navy Reserves.
            </div>
            <div className="text">
              Consistently pursuing excellence and driven in self growth for
              software development.
            </div>
            <div className="text">Honest. Creative. Dedicated.</div>
          </div>
          <div className="imgWrapper">
            <img src={profile_pic} className="profile_pic" />
          </div>
        </div>
      </div>
    );
  };

  return <>{width <= 500 ? <MobileBioSection /> : <BioSection />}</>;
};

export default BioSection;
