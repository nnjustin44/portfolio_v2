import React from "react";
import MobileMenu from "./MobileMenu";
import { Button } from "@mui/material";
import openInNewTab from "../helpers/openNewTab";
import { LINKS, MOBILE_BREAKPOINT } from "../../AppConstants";
import HomeIcon from "@mui/icons-material/Home";
import HandymanIcon from "@mui/icons-material/Handyman";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EngineeringIcon from "@mui/icons-material/Engineering";
import GitHubIcon from "@mui/icons-material/GitHub";
import DescriptionIcon from "@mui/icons-material/Description";
import ThemeToggle from "./ThemeToggle";

const MenuHeader = ({ width, height, theme, onToggleTheme }) => {
  const Menu = () => {
    return (
      <div className="menu">
        <div className="menuNavbar">
          <div className="name">JUSTIN NGUYEN</div>
        </div>
        <a href="#homeSection" className="menuNavbar">
          <Button className="nav-btn">
            <HomeIcon className="menuIcon" />
            Home
          </Button>
        </a>
        <a href="#jonahSection" className="menuNavbar">
          <Button className="nav-btn">
            <AccessibilityNewIcon className="menuIcon" />
            J.O.N.A.H
          </Button>
        </a>
        <a href="#experienceSection" className="menuNavbar">
          <Button className="nav-btn">
            <EngineeringIcon className="menuIcon" />
            Experience
          </Button>
        </a>
        <a href="#skillSection" className="menuNavbar">
          <Button className="nav-btn">
            <HandymanIcon className="menuIcon" />
            Skillset
          </Button>
        </a>
        <a href="#connectSection" className="menuNavbar">
          <Button className="nav-btn">
            <PhoneAndroidIcon className="menuIcon" />
            Connect
          </Button>
        </a>
        <div className="menuNavbar">
          <Button
            className="nav-btn"
            onClick={() => openInNewTab(LINKS.GITHUB_LINK)}
          >
            <GitHubIcon className="menuIcon" />
            Github
          </Button>
        </div>
        <div className="menuNavbar">
          <Button
            className="nav-btn"
            component="a"
            href={LINKS.RESUME_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <DescriptionIcon className="menuIcon" />
            Resume
          </Button>
        </div>
        <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
      </div>
    );
  };
  return (
    <>
      {width <= MOBILE_BREAKPOINT ? (
        <MobileMenu theme={theme} onToggleTheme={onToggleTheme} />
      ) : (
        <Menu />
      )}
    </>
  );
};

export default MenuHeader;
