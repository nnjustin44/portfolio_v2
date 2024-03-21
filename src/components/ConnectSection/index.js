import React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import openInNewTab from "../helpers/openNewTab";
import { LINKS } from "../../AppConstants";
import "./styles.scss";

const ConnectSection = ({ deviceSize }) => {
  const sendEmail = () => {
    window.location =
      "mailto:nnjustin44@gmail.com?subject=Saying Hello!&body=Hello!";
  };
  return (
    <div className="connect">
      <h1 className={deviceSize}>Connect</h1>
      <div className="connectButton">
        <MailOutlineIcon />:
        <a>
          <button className="connect-btn" onClick={sendEmail}>
            nnjustin44@gmail.com
          </button>
        </a>
      </div>
      <div className="connectIcons">
        <PhoneIphoneIcon />:<div className="sub-item">404-789-0044</div>
      </div>
      <div className="connectButton">
        <LinkedInIcon />:
        <a>
          <button
            className="connect-btn"
            onClick={() => openInNewTab(LINKS.LINKEDIN_LINK)}
          >
            LinkedIn
          </button>
        </a>
      </div>
    </div>
  );
};

export default ConnectSection;
