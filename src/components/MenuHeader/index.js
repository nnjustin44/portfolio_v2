import React from "react";
import MobileMenu from "./MobileMenu";
import { Button } from "@mui/material";
import openInNewTab from "../helpers/openNewTab";
import { LINKS } from "../../AppConstants";

const MenuHeader = ({ width, height }) => {
  const Menu = () => {
    return (
      <div className="menu">
        <a href="#homeSection" className="menuNavbar">
<<<<<<< Updated upstream
          <Button className="nav-btn">Home</Button>
        </a>
        <a href="#jonahSection" className="menuNavbar">
          <Button className="nav-btn">J.O.N.A.H</Button>
        </a>
        <a href="#skillSection" className="menuNavbar">
          <Button className="nav-btn">Skillset</Button>
        </a>
        <a href="#experienceSection" className="menuNavbar">
          <Button className="nav-btn">Experience</Button>
        </a>
        <a href="#connectSection" className="menuNavbar">
          <Button className="nav-btn">Connect</Button>
=======
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
        <a href="#skillSection" className="menuNavbar">
          <Button className="nav-btn">
            <HandymanIcon className="menuIcon" />
            Skillset
          </Button>
        </a>
        <a href="#experienceSection" className="menuNavbar">
          <Button className="nav-btn">
            <EngineeringIcon className="menuIcon" />
            Experience
          </Button>
        </a>
        <a href="#connectSection" className="menuNavbar">
          <Button className="nav-btn">
            <PhoneAndroidIcon className="menuIcon" />
            Connect
          </Button>
>>>>>>> Stashed changes
        </a>
        <a className="menuNavbar">
          <Button
            className="nav-btn"
            onClick={() => openInNewTab(LINKS.GITHUB_LINK)}
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
            onClick={() => openInNewTab(LINKS.RESUME_LINK)}
          >
<<<<<<< Updated upstream
=======
            <DescriptionIcon className="menuIcon" />
>>>>>>> Stashed changes
            Resume
          </Button>
        </a>
        <div className="menuNavbar">
          <div className="name">Justin Nguyen</div>
        </div>
      </div>
    );
  };
  return <>{width <= 500 ? <MobileMenu /> : <Menu />}</>;
};
export default MenuHeader;
