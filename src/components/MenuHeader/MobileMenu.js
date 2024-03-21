import React, { useState } from "react";
import "./styles.scss";
import {
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";
import HomeIcon from "@mui/icons-material/Home";
import HandymanIcon from "@mui/icons-material/Handyman";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EngineeringIcon from "@mui/icons-material/Engineering";
import GitHubIcon from "@mui/icons-material/GitHub";
import DescriptionIcon from "@mui/icons-material/Description";
import { DeleteForever, Edit, MoreVert } from "@mui/icons-material";
import openInNewTab from "../helpers/openNewTab";
import { LINKS } from "../../AppConstants";
import { Button } from "@mui/material";

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
            <HomeIcon className="menuIcon" color="primary" />
            Home
          </Button>
        </a>
        <a href="#jonahSection" className="menuNavbar">
          <Button className="nav-btn" onClick={handleClick}>
            <AccessibilityNewIcon className="menuIcon" color="primary" />
            J.O.N.A.H
          </Button>
        </a>
        <a href="#skillSection" className="menuNavbar">
          <Button className="nav-btn" onClick={handleClick}>
            <HandymanIcon className="menuIcon" color="primary" />
            Skillset
          </Button>
        </a>
        <a href="#experienceSection" className="menuNavbar">
          <Button className="nav-btn" onClick={handleClick}>
            <EngineeringIcon className="menuIcon" color="primary" />
            Experience
          </Button>
        </a>
        <a href="#connectSection" className="menuNavbar">
          <Button className="nav-btn" onClick={handleClick}>
            <PhoneAndroidIcon className="menuIcon" color="primary" />
            Connect
          </Button>
        </a>
        <a className="menuNavbar">
          <Button
            className="nav-btn"
            onClick={() => openInNewTab(LINKS.GITHUB_LINK) & handleClick()}
          >
            <GitHubIcon className="menuIcon" color="primary" />
            Github
          </Button>
        </a>
        <a className="menuNavbar">
          <Button
            className="nav-btn"
            onClick={() => openInNewTab(LINKS.RESUME_LINK) & handleClick()}
          >
            <DescriptionIcon className="menuIcon" color="primary" />
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
        <div className="mobileName">Justin Nguyen</div>
      </div>
      {opened ? <MobileDropdown /> : null}
    </>
  );
};

export default MobileMenu;
