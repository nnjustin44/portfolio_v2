import React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { linkedInLink } from "../../AppConstants";
import openInNewTab from "../helpers/openNewTab";

const ConnectSection = () => {
  return (
    <div className="connect">
      <h1 className="title">Connect</h1>
      <div className="connectIcons">
        <MailOutlineIcon />:
        <div className="sub-item"> nnjustin44@gmail.com</div>
      </div>
      <div className="connectIcons">
        <PhoneIphoneIcon />:<div className="sub-item">404-789-0044</div>
      </div>
      <div className="linkedIn">
        <LinkedInIcon />:
        <a>
          <button
            className="linkedIn-btn"
            onClick={() => openInNewTab(linkedInLink)}
          >
            LinkedIn
          </button>
        </a>
      </div>
    </div>
  );
};

export default ConnectSection;