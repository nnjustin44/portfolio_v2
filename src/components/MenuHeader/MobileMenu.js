import React, { useState } from "react";
import "./styles.scss";
import { IconButton } from "@mui/joy";
import HomeIcon from "@mui/icons-material/Home";
import HandymanIcon from "@mui/icons-material/Handyman";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EngineeringIcon from "@mui/icons-material/Engineering";
import GitHubIcon from "@mui/icons-material/GitHub";
import DescriptionIcon from "@mui/icons-material/Description";
import openInNewTab from "../helpers/openNewTab";
import { LINKS } from "../../AppConstants";
import { Button } from "@mui/material";

const MobileMenu = () => {
  const [opened, setOpened] = useState(false);

  const handleClick = (event) => {
    setOpened(!opened);
  };

  const MobileDropdown = () => {
    return (
      <div className="mobileMenu">
        <a href="#homeSection" className="menuNavbar">
          <Button className="nav-btn" onClick={handleClick}>
            <HomeIcon className="menuIcon" />
            Home
          </Button>
        </a>
        <a href="#jonahSection" className="menuNavbar">
          <Button className="nav-btn" onClick={handleClick}>
            <AccessibilityNewIcon className="menuIcon" />
            J.O.N.A.H
          </Button>
        </a>
        <a href="#experienceSection" className="menuNavbar">
          <Button className="nav-btn" onClick={handleClick}>
            <EngineeringIcon className="menuIcon" />
            Experience
          </Button>
        </a>
        <a href="#skillSection" className="menuNavbar">
          <Button className="nav-btn" onClick={handleClick}>
            <HandymanIcon className="menuIcon" />
            Skillset
          </Button>
        </a>
        <a href="#connectSection" className="menuNavbar">
          <Button className="nav-btn" onClick={handleClick}>
            <PhoneAndroidIcon className="menuIcon" />
            Connect
          </Button>
        </a>
        <a className="menuNavbar">
          <Button
            className="nav-btn"
            onClick={() => openInNewTab(LINKS.GITHUB_LINK) & handleClick()}
          >
            <GitHubIcon className="menuIcon" />
            Github
          </Button>
        </a>
        <a className="menuNavbar">
          <Button
            className="nav-btn"
            onClick={() => openInNewTab(LINKS.RESUME_LINK) & handleClick()}
          >
            <DescriptionIcon className="menuIcon" />
            Resume
          </Button>
        </a>
      </div>
    );
  };

  return (
    <>
      <div className="mobileHeader">
        {opened ? (
          <IconButton className="mobileButton" onClick={handleClick}>
            <CloseIcon />
          </IconButton>
        ) : (
          <IconButton className="mobileButton" onClick={handleClick}>
            <MenuIcon fontSize="medium" />
          </IconButton>
        )}
      </div>
      {opened ? <MobileDropdown /> : null}
    </>
  );
};

export default MobileMenu;
