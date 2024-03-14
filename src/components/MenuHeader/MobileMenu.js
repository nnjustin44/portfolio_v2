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
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
            Home
          </Button>
        </a>
        <a href="#homeSection" className="menuNavbar">
          <Button className="nav-btn" onClick={handleClick}>
            J.O.N.A.H
          </Button>
        </a>
        <a href="#skillSection" className="menuNavbar">
          <Button className="nav-btn" onClick={handleClick}>
            Skillset
          </Button>
        </a>
        <a href="#experienceSection" className="menuNavbar">
          <Button className="nav-btn" onClick={handleClick}>
            Experience
          </Button>
        </a>
        <a href="#connectSection" className="menuNavbar">
          <Button className="nav-btn" onClick={handleClick}>
            Connect
          </Button>
        </a>
        <a className="menuNavbar">
          <Button
            className="nav-btn"
            onClick={() => openInNewTab(LINKS.GITHUB_LINK) & handleClick()}
          >
            Github
          </Button>
        </a>
        <a className="menuNavbar">
          <Button
            className="nav-btn"
            onClick={() => openInNewTab(LINKS.RESUME_LINK) & handleClick()}
          >
            Resume
          </Button>
        </a>
      </div>
    );
  };

  return (
    <>
      <div className="mobileButton">
        <IconButton className="mobileButton" onClick={handleClick}>
          <MoreVertIcon sx="lg" />
        </IconButton>
        {/* <div className="mobileName">Justin Nguyen</div> */}
      </div>
      {opened ? <MobileDropdown /> : null}
    </>
  );
};

export default MobileMenu;
