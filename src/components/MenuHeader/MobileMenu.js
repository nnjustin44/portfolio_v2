import React, { useState } from "react";
import "./styles.scss";
<<<<<<< Updated upstream
import {
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DeleteForever, Edit, MoreVert } from "@mui/icons-material";
=======
import { IconButton } from "@mui/joy";
import HomeIcon from "@mui/icons-material/Home";
import HandymanIcon from "@mui/icons-material/Handyman";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EngineeringIcon from "@mui/icons-material/Engineering";
import GitHubIcon from "@mui/icons-material/GitHub";
import DescriptionIcon from "@mui/icons-material/Description";
>>>>>>> Stashed changes
import openInNewTab from "../helpers/openNewTab";
import { LINKS } from "../../AppConstants";
import { Button } from "@mui/material";
import profile_pic from "../../images/profile_pic.jpeg";

const MobileMenu = () => {
  const [opened, setOpened] = useState(false);

  const handleClick = (event) => {
    setOpened(!opened);
    console.log("Hello");
  };

  const MobileDropdown = () => {
    return (
      <div className="mobileMenu">
        <a href="#homeSection" className="menuNavbar">
          <Button className="nav-btn" onClick={handleClick}>
<<<<<<< Updated upstream
=======
            <HomeIcon className="menuIcon" />
>>>>>>> Stashed changes
            Home
          </Button>
        </a>
        <a href="#jonahSection" className="menuNavbar">
          <Button className="nav-btn" onClick={handleClick}>
<<<<<<< Updated upstream
=======
            <AccessibilityNewIcon className="menuIcon" />
>>>>>>> Stashed changes
            J.O.N.A.H
          </Button>
        </a>
        <a href="#skillSection" className="menuNavbar">
          <Button className="nav-btn" onClick={handleClick}>
<<<<<<< Updated upstream
=======
            <HandymanIcon className="menuIcon" />
>>>>>>> Stashed changes
            Skillset
          </Button>
        </a>
        <a href="#experienceSection" className="menuNavbar">
          <Button className="nav-btn" onClick={handleClick}>
<<<<<<< Updated upstream
=======
            <EngineeringIcon className="menuIcon" />
>>>>>>> Stashed changes
            Experience
          </Button>
        </a>
        <a href="#connectSection" className="menuNavbar">
          <Button className="nav-btn" onClick={handleClick}>
<<<<<<< Updated upstream
=======
            <PhoneAndroidIcon className="menuIcon" />
>>>>>>> Stashed changes
            Connect
          </Button>
        </a>
        <a className="menuNavbar">
          <Button
            className="nav-btn"
            onClick={() => openInNewTab(LINKS.GITHUB_LINK) & handleClick()}
          >
<<<<<<< Updated upstream
=======
            <GitHubIcon className="menuIcon" />
>>>>>>> Stashed changes
            Github
          </Button>
        </a>
        <a className="menuNavbar">
          <Button
            className="nav-btn"
            onClick={() => openInNewTab(LINKS.RESUME_LINK) & handleClick()}
          >
<<<<<<< Updated upstream
=======
            <DescriptionIcon className="menuIcon" />
>>>>>>> Stashed changes
            Resume
          </Button>
        </a>
      </div>
    );
  };

  return (
    <>
      <div className="mobileHeader">
        <IconButton className="mobileButton" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <div className="mobileImgWrapper">
          <img src={profile_pic} className="mobileProfilePic" />
        </div>
      </div>
      {opened ? <MobileDropdown /> : null}
    </>
  );
};

export default MobileMenu;
