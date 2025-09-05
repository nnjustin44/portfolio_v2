import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/BioSection", () => () => (
  <div data-testid="bio-section">Bio Section</div>
));
jest.mock("./components/ConnectSection", () => () => (
  <div data-testid="connect-section">Connect Section</div>
));
jest.mock("./components/ExperienceSection", () => () => (
  <div data-testid="experience-section">Experience Section</div>
));
jest.mock("./components/SkillsSection", () => () => (
  <div data-testid="skill-section">Skill Section</div>
));
jest.mock("./components/JONAH", () => () => (
  <div data-testid="jonah-section">JONAH Section</div>
));
jest.mock("./components/AboutJonah", () => () => (
  <div data-testid="about-jonah-section">About Jonah Section</div>
));
jest.mock("./components/MenuHeader", () => () => (
  <div data-testid="menu-header">Menu Header</div>
));

jest.mock("dotenv", () => ({
  config: jest.fn(),
}));

const originalLocation = window.location;
beforeEach(() => {
  delete window.location;
  window.location = { ...originalLocation, reload: jest.fn() };
});

afterEach(() => {
  window.location = originalLocation;
  jest.clearAllMocks();
});

describe("App component", () => {
  test("renders portfolio title", () => {
    render(<App />);
    const titleElement = screen.getByText("Justin Nguyen Portfolio");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("TITLE");
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
    expect(bioSection).toBeInTheDocument();
  });

  test("handles window resize event", () => {
    render(<App />);
    const resizeEvent = new Event("resize");
    window.dispatchEvent(resizeEvent);
    expect(window.location.reload).toHaveBeenCalled();
  });
});
