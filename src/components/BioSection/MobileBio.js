import React from "react";
import profile_pic from "../../images/profile_pic.jpeg";

const MobileBioSection = () => {
  return (
    <div className="mobileBioSection">
      <h1 className="mobileTitle">Meet The Developer</h1>
      <div className="bioBody">
        <div className="mobileImgWrapper">
          <img src={profile_pic} className="profile_pic" />
        </div>
        <div className="aboutMe">
          <div className="text">
            My name is Justin Nguyen, I am a self taught programmer.
          </div>
          <div className="text">
            Graduated with a degree in Biology and a direct commissioned officer
            in the United States Navy Reserves.
          </div>
          <div className="text">
            Consistently pursuing excellence and driven in self growth for
            software development.
          </div>
          <div className="text">Honest. Creative. Dedicated.</div>
        </div>
      </div>
    </div>
  );
};
export default MobileBioSection;
