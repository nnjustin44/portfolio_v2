import React from "react";
import Button from "@mui/material/Button";
import openInNewTab from "../helpers/openNewTab";
import { LINKS } from "../../AppConstants";
import "./styles.scss";
const MenuHeader = ({ width, height }) => {
  return (
    <div className="menu">
      <a href="#homeSection" className="menuNavbar">
        <Button className="nav-btn">Home</Button>
      </a>
      {/* <a href="#homeSection" className="menuNavbar">
        <Button className="nav-btn">J.O.N.A.H</Button>
      </a> */}
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
      {/* <a className="menuNavbar">
        <Button
          className="nav-btn"
          onClick={() => openInNewTab(LINKS.RESUME_LINK)}
        >
          Resume
        </Button>
      </a> */}

      <div className="menuNavbar">
        <div className="name">Justin Nguyen</div>
      </div>
    </div>
  );
};

export default MenuHeader;
