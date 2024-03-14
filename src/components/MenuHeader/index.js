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
          <Button className="nav-btn">Home</Button>
        </a>
        <a href="#homeSection" className="menuNavbar">
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
        </a>
        <a className="menuNavbar">
          <Button
            className="nav-btn"
            onClick={() => openInNewTab(LINKS.GITHUB_LINK)}
          >
            Github
          </Button>
        </a>
        <a className="menuNavbar">
          <Button
            className="nav-btn"
            onClick={() => openInNewTab(LINKS.RESUME_LINK)}
          >
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
