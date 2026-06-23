import React from "react";
import { IconButton } from "@mui/joy";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const ThemeToggle = ({ theme, onToggleTheme }) => {
  const activeTheme = theme === "dark" ? "dark" : "light";
  const nextTheme = activeTheme === "light" ? "dark" : "light";

  return (
    <IconButton
      aria-label={`Switch to ${nextTheme} mode`}
      className="themeToggle"
      onClick={onToggleTheme}
      title={`Switch to ${nextTheme} mode`}
    >
      {activeTheme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

export default ThemeToggle;
