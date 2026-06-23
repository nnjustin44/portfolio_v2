import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

jest.mock("./components/BioSection", () => ({ width, deviceSize }) => (
  <div
    data-testid="bio-section"
    data-width={width}
    data-device-size={deviceSize}
  >
    Bio Section
  </div>
));
jest.mock("./components/ConnectSection", () => ({ deviceSize }) => (
  <div data-testid="connect-section" data-device-size={deviceSize}>
    Connect Section
  </div>
));
jest.mock("./components/ExperienceSection", () => ({ deviceSize }) => (
  <div data-testid="experience-section" data-device-size={deviceSize}>
    Experience Section
  </div>
));
jest.mock("./components/SkillsSection", () => ({ deviceSize }) => (
  <div data-testid="skill-section" data-device-size={deviceSize}>
    Skill Section
  </div>
));
jest.mock("./components/JONAH", () => ({ deviceSize }) => (
  <div data-testid="jonah-section" data-device-size={deviceSize}>
    JONAH Section
  </div>
));
jest.mock("./components/AboutJonah", () => ({ deviceSize }) => (
  <div data-testid="about-jonah-section" data-device-size={deviceSize}>
    About Jonah Section
  </div>
));
jest.mock(
  "./components/MenuHeader",
  () =>
    ({ width, theme, onToggleTheme }) =>
      (
        <div data-testid="menu-header" data-width={width} data-theme={theme}>
          Menu Header
          <button onClick={onToggleTheme}>Toggle theme</button>
        </div>
      )
);

const originalLocation = window.location;
beforeEach(() => {
  delete window.location;
  window.location = { ...originalLocation, reload: jest.fn() };
  window.localStorage.clear();
  delete document.documentElement.dataset.theme;
});

afterEach(() => {
  window.location = originalLocation;
  jest.clearAllMocks();
});

describe("App component", () => {
  test("renders portfolio title", () => {
    render(<App />);
    expect(document.title).toBe("Justin Nguyen Portfolio");
  });

  test("defaults to light mode and toggles to dark mode", async () => {
    render(<App />);

    expect(screen.getByTestId("menu-header")).toHaveAttribute(
      "data-theme",
      "light"
    );
    expect(document.documentElement).toHaveAttribute("data-theme", "light");

    act(() => {
      screen.getByRole("button", { name: "Toggle theme" }).click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("menu-header")).toHaveAttribute(
        "data-theme",
        "dark"
      );
    });
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(window.localStorage.getItem("portfolio-theme")).toBe("dark");
  });

  test("restores a saved dark mode preference", () => {
    window.localStorage.setItem("portfolio-theme", "dark");

    render(<App />);

    expect(screen.getByTestId("menu-header")).toHaveAttribute(
      "data-theme",
      "dark"
    );
  });

  test("renders all main sections", () => {
    render(<App />);
    expect(screen.getByTestId("menu-header")).toBeInTheDocument();
    expect(screen.getByTestId("bio-section")).toBeInTheDocument();
    expect(screen.getByTestId("skill-section")).toBeInTheDocument();
    expect(screen.getByTestId("experience-section")).toBeInTheDocument();
    expect(screen.getByTestId("jonah-section")).toBeInTheDocument();
    expect(screen.getByTestId("about-jonah-section")).toBeInTheDocument();
    expect(screen.getByTestId("connect-section")).toBeInTheDocument();
  });

  test("sets correct deviceSize based on window width", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 1000,
    });
    render(<App />);
    const bioSection = screen.getByTestId("bio-section");
    expect(bioSection).toHaveAttribute("data-device-size", "mobileTitle");
    expect(bioSection).toHaveAttribute("data-width", "1000");
  });

  test("updates responsive props on resize without reloading the page", async () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 1200,
    });
    render(<App />);

    expect(screen.getByTestId("bio-section")).toHaveAttribute(
      "data-device-size",
      "title"
    );

    act(() => {
      window.innerWidth = 800;
      window.dispatchEvent(new Event("resize"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("bio-section")).toHaveAttribute(
        "data-device-size",
        "mobileTitle"
      );
    });
    expect(screen.getByTestId("menu-header")).toHaveAttribute(
      "data-width",
      "800"
    );
    expect(window.location.reload).not.toHaveBeenCalled();
  });
});
