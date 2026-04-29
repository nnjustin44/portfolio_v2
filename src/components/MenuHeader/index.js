import React from "react";
import MobileMenu from "./MobileMenu";
import { Button } from "@mui/material";
import openInNewTab from "../helpers/openNewTab";
import { LINKS } from "../../AppConstants";
import HomeIcon from "@mui/icons-material/Home";
import HandymanIcon from "@mui/icons-material/Handyman";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EngineeringIcon from "@mui/icons-material/Engineering";
import GitHubIcon from "@mui/icons-material/GitHub";
import DescriptionIcon from "@mui/icons-material/Description";

<<<<<<< Updated upstream
const MenuHeader = ({ width, height }) => {
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
        <a className="menuNavbar">
          <Button
            className="nav-btn"
            onClick={() => openInNewTab(LINKS.GITHUB_LINK)}
          >
            <GitHubIcon className="menuIcon" />
            Github
          </Button>
        </a>
        <a className="menuNavbar">
          <Button
            className="nav-btn"
            onClick={() => openInNewTab(LINKS.RESUME_LINK)}
          >
            <DescriptionIcon className="menuIcon" />
            Resume
          </Button>
        </a>
      </div>
    );
  };
  return <>{width <= 1100 ? <MobileMenu /> : <Menu />}</>;
=======
const MenuHeader = ({ width }) => {
  const MenuItem = (props) => (
    <Button className="nav-btn" onClick={props.onClick}>
      <span className="menuIcon">{props.icon}</span>
      {props.label}
    </Button>
  );

  return (
    <>
      {width <= 1100 ? (
        <MobileMenu />
      ) : (
        <div className="menu">
          <div className="menuNavbar">
            <div className="name">JUSTIN NGUYEN</div>
          </div>

          {/* Home */}
          <MenuItem href="#homeSection" icon={<HomeIcon />} label="Home" />

          {/* J.O.N.A.H */}
          <MenuItem
            href="#jonahSection"
            icon={<AccessibilityNewIcon />}
            label="J.O.N.A.H"
          />

          {/* Experience */}
          <MenuItem
            href="#experienceSection"
            icon={<EngineeringIcon />}
            label="Experience"
          />

          {/* Skillset */}
          <MenuItem
            href="#skillSection"
            icon={<HandymanIcon />}
            label="Skillset"
          />

          {/* Connect */}
          <MenuItem
            href="#connectSection"
            icon={<PhoneAndroidIcon />}
            label="Connect"
          />

          {/* GitHub */}
          <MenuItem
            onClick={() => openInNewTab(LINKS.GITHUB_LINK)}
            icon={<GitHubIcon />}
            label="Github"
          />

          {/* Resume */}
          <MenuItem
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/assets/Resume_Justin_Nguyen.pdf";
              link.download = "Resume_Justin_Nguyen.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            icon={<DescriptionIcon />}
            label="Resume"
          />
        </div>
      )}
    </>
  );
>>>>>>> Stashed changes
};

export default MenuHeader;
