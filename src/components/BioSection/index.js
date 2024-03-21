import React from "react";
import profile_pic from "../../images/profile_pic.jpeg";
import "./styles.scss";
import MobileBioSection from "./MobileBio";
const BioSection = ({ width, height }) => {
  const BioSection = () => {
    return (
      <div className="bioSection">
        <p id="head1" class="aniHeader">
          Meet The Developer
        </p>
        <p id="head2" class="aniHeader">
          Justin Nguyen
        </p>
        <p id="head3" class="aniHeader">
          Self Taught
        </p>
        <p id="head4" class="aniHeader">
          Honest. Creative. Dedicated.
        </p>
        <p id="head5" class="aniHeader">
          Welcome to BA designs
        </p>
        <div class="light x1"></div>
        <div class="light x2"></div>
        <div class="light x3"></div>
        <div class="light x4"></div>
        <div class="light x5"></div>
        <div class="light x6"></div>
        <div class="light x7"></div>
        <div class="light x8"></div>
        <div class="light x9"></div>

        <div className="bioBody">
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
