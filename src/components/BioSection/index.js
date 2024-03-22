import React from "react";
import profile_pic from "../../images/profile_pic.jpeg";
import "./styles.scss";
import MobileBioSection from "./MobileBio";
const BioSection = ({ width, height }) => {
  const BioSection = () => {
    return (
      <div className="bioSection">
        <div className="bioBody">
          <p id="head1" class="aniHeader">
            Meet The Developer
          </p>
          <p id="head2" class="aniHeader">
            Justin Nguyen
          </p>
          <p id="head3" class="aniHeader">
            Honest. Creative. Dedicated.
          </p>
          <p id="head4" class="aniHeader">
            This website was developed from the ground up
          </p>
          <p id="head5" class="aniHeader">
            Developed for both mobile and desktop
          </p>
          <p id="head6" class="aniHeader">
            Artificial Intelligence
          </p>
          <p id="head7" class="aniHeader">
            Welcome to my Portfolio
          </p>
          <p id="head8" class="aniHeader">
            Fullstack Software Engineer
          </p>
          <div className="imgWrapper">
            <img src={profile_pic} className="profile_pic" />
          </div>
        </div>
        <div class="light x1"></div>
        <div class="light x2"></div>
        <div class="light x3"></div>
        <div class="light x4"></div>
        <div class="light x5"></div>
        <div class="light x6"></div>
        <div class="light x7"></div>
        <div class="light x8"></div>
        <div class="light x9"></div>
      </div>
    );
  };

  return <>{width <= 1100 ? <MobileBioSection /> : <BioSection />}</>;
};

export default BioSection;
