import React from "react";
import profile_pic from "../../images/profile_pic.jpeg";

const MobileBioSection = () => {
  return (
    <div className="mobileBioSection">
      <div className="bioBody">
        <div className="mobileImgWrapper">
          <img
            src={profile_pic}
            className="mobileProfilePic"
            alt="Justin Nguyen"
          />
        </div>
        <p id="head1" className="aniHeader">
          Meet The Developer
        </p>
        <p id="head2" className="aniHeader">
          Justin Nguyen
        </p>
        <p id="head3" className="aniHeader">
          Honest. Creative. Dedicated.
        </p>
        <p id="head4" className="aniHeader">
          Portfolio developed from the ground up
        </p>
        <p id="head5" className="aniHeader">
          Developed for both mobile and desktop
        </p>
        <p id="head6" className="aniHeader">
          Powered by OpenAI
        </p>
        <p id="head7" className="aniHeader">
          Welcome to my Portfolio
        </p>
        <p id="head8" className="aniHeader">
          Fullstack Software Engineer
        </p>
        <div className="light x1"></div>
        <div className="light x2"></div>
        <div className="light x3"></div>
        <div className="light x4"></div>
        <div className="light x5"></div>
        <div className="light x6"></div>
        <div className="light x7"></div>
        <div className="light x8"></div>
        <div className="light x9"></div>
      </div>
    </div>
  );
};
export default MobileBioSection;
