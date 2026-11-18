import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import AboutJonah from "./AboutJonah";
import BioSection from "./BioSection";
import MobileBioSection from "./BioSection/MobileBio";
import ConnectSection from "./ConnectSection";
import ExperienceSection from "./ExperienceSection";
import JONAH from "./JONAH";
import useJonah from "./JONAH/useJonah";
import MenuHeader from "./MenuHeader";
import MobileMenu from "./MenuHeader/MobileMenu";
import SkillSection from "./SkillsSection";
import openInNewTab from "./helpers/openNewTab";
import { LINKS, placeHolder } from "../AppConstants";

jest.mock("./helpers/openNewTab", () => jest.fn());
jest.mock("./JONAH/useJonah", () => jest.fn());

describe("portfolio components", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("BioSection renders the desktop bio when width is above the mobile breakpoint", () => {
    const { container } = render(<BioSection width={1200} />);

    expect(screen.getByText("Meet The Developer")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Justin Nguyen" })
    ).toBeInTheDocument();
    expect(screen.getAllByText("Fullstack Software Engineer")).toHaveLength(2);
    expect(container.querySelector(".bioSection")).toBeInTheDocument();
    expect(container.querySelector(".profile_pic")).toBeInTheDocument();
    expect(container.querySelectorAll(".light")).toHaveLength(9);
  });

  test("BioSection renders the mobile bio when width is at the mobile breakpoint", () => {
    const { container } = render(<BioSection width={1100} />);

    expect(screen.getByText("Welcome to my Portfolio")).toBeInTheDocument();
    expect(container.querySelector(".mobileBioSection")).toBeInTheDocument();
    expect(container.querySelector(".mobileProfilePic")).toBeInTheDocument();
  });

  test("MobileBioSection renders the mobile profile content", () => {
    const { container } = render(<MobileBioSection />);

    expect(screen.getByText("Powered by OpenAI")).toBeInTheDocument();
    expect(container.querySelector(".mobileImgWrapper")).toBeInTheDocument();
    expect(container.querySelectorAll(".light")).toHaveLength(9);
  });

  test("SkillSection renders the heading and core skills", () => {
    render(<SkillSection deviceSize="title" />);

    expect(screen.getByRole("heading", { name: "Skillset" })).toHaveClass(
      "title"
    );
    [
      "REACT",
      "AI INTEGRATION",
      "NEXT.JS",
      "REDUX",
      "TYPESCRIPT",
      "JAVASCRIPT",
      "HTML/CSS",
      "Software Development Life Cycle",
      "C# .NET CORE",
      "Docker/Kubernetes",
      "Palantir Foundry / AIP",
      "SQL/Postgres",
      "GIT",
      "Java",
      "SpringBoot",
      "Quarkus",
    ].forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  test("ExperienceSection renders its heading and portfolio experience copy", () => {
    render(<ExperienceSection deviceSize="mobileTitle" />);

    expect(screen.getByRole("heading", { name: "Experience" })).toHaveClass(
      "mobileTitle"
    );
    expect(screen.getByText(/Fiserv in 2021/)).toBeInTheDocument();
    expect(screen.getByText(/integrating AI into production applications/)).toBeInTheDocument();
    expect(screen.getByText(/GitHub repository/)).toBeInTheDocument();
  });

  test("AboutJonah renders the JONAH description", () => {
    render(<AboutJonah deviceSize="title" />);

    expect(screen.getByRole("heading", { name: "About JONAH" })).toHaveClass(
      "title"
    );
    expect(
      screen.getByText(/Justin's Online Native Artificial Helper/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Powered by OpenAI/)).toBeInTheDocument();
  });

  test("ConnectSection renders contact options and opens LinkedIn", () => {
    render(<ConnectSection deviceSize="title" />);

    expect(screen.getByRole("heading", { name: "Connect" })).toHaveClass(
      "title"
    );
    expect(screen.getByText("nnjustin44@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("404-789-0044")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "LinkedIn" }));
    expect(openInNewTab).toHaveBeenCalledWith(LINKS.LINKEDIN_LINK);
  });

  test("MenuHeader renders desktop navigation and opens external links", () => {
    const onToggleTheme = jest.fn();
    render(
      <MenuHeader
        width={1200}
        height={800}
        theme="light"
        onToggleTheme={onToggleTheme}
      />
    );

    expect(screen.getByText("JUSTIN NGUYEN")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(7);
    expect(
      screen.getByRole("button", { name: /Home/ }).closest("a")
    ).toHaveAttribute("href", "#homeSection");
    expect(
      screen.getByRole("button", { name: /J\.O\.N\.A\.H/ }).closest("a")
    ).toHaveAttribute("href", "#jonahSection");

    fireEvent.click(screen.getByRole("button", { name: /Github/ }));
    expect(openInNewTab).toHaveBeenCalledWith(LINKS.GITHUB_LINK);

    const resumeLink = screen.getByRole("link", { name: /Resume/ });
    expect(resumeLink).toHaveAttribute("href", LINKS.RESUME_LINK);
    expect(resumeLink).not.toHaveAttribute("download");
    expect(resumeLink).toHaveAttribute("target", "_blank");
    expect(resumeLink).toHaveAttribute("rel", "noopener noreferrer");

    fireEvent.click(
      screen.getByRole("button", { name: "Switch to dark mode" })
    );
    expect(onToggleTheme).toHaveBeenCalled();
  });

  test("MenuHeader renders MobileMenu at the mobile breakpoint", () => {
    render(<MenuHeader width={800} />);

    expect(screen.getByText("JUSTIN NGUYEN")).toHaveClass("mobileName");
    expect(
      screen.queryByRole("button", { name: /Home/ })
    ).not.toBeInTheDocument();
  });

  test("MobileMenu toggles navigation and closes after selecting a link", () => {
    render(<MobileMenu theme="dark" onToggleTheme={jest.fn()} />);

    expect(
      screen.getByRole("button", { name: "Switch to light mode" })
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "Open navigation menu" })
    );
    expect(
      screen.getByRole("button", { name: "Close navigation menu" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Home/ })).toBeInTheDocument();
    const resumeLink = screen.getByRole("link", { name: /Resume/ });
    expect(resumeLink).toHaveAttribute("href", LINKS.RESUME_LINK);
    expect(resumeLink).not.toHaveAttribute("download");
    expect(resumeLink).toHaveAttribute("target", "_blank");
    expect(resumeLink).toHaveAttribute("rel", "noopener noreferrer");

    fireEvent.click(screen.getByRole("button", { name: /Github/ }));
    expect(openInNewTab).toHaveBeenCalledWith(LINKS.GITHUB_LINK);
    expect(
      screen.queryByRole("button", { name: /Home/ })
    ).not.toBeInTheDocument();
  });

  test("JONAH renders the assistant response form and submits typed input", () => {
    const setInput = jest.fn();
    const onSubmit = jest.fn();
    const handleKeyDown = jest.fn();

    useJonah.mockReturnValue({
      loading: false,
      input: "What can you do?",
      setInput,
      onSubmit,
      handleKeyDown,
      messages: [
        { id: "welcome", sender: "jonah", text: placeHolder },
        { id: "user-1", sender: "user", text: "What can you do?" },
      ],
    });

    render(<JONAH deviceSize="title" />);

    expect(screen.getByRole("heading", { name: "J.O.N.A.H" })).toHaveClass(
      "title"
    );
    expect(screen.getByText(placeHolder)).toBeInTheDocument();
    expect(screen.getByText("What can you do?")).toBeInTheDocument();
    expect(
      screen.getByRole("log", { name: "Conversation with J.O.N.A.H" })
    ).toBeInTheDocument();

    const input = screen.getByPlaceholderText("Ask me anything you'd like!");
    expect(input).toHaveValue("What can you do?");
    expect(input).toHaveAttribute("maxlength", "500");
    fireEvent.change(input, { target: { value: "Tell me about Justin" } });
    expect(setInput).toHaveBeenCalledWith("Tell me about Justin");

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(handleKeyDown).toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalled();
  });

  test("JONAH shows a loading indicator while awaiting a response", () => {
    useJonah.mockReturnValue({
      loading: true,
      input: "",
      setInput: jest.fn(),
      onSubmit: jest.fn(),
      handleKeyDown: jest.fn(),
      messages: [
        { id: "welcome", sender: "jonah", text: placeHolder },
        { id: "user-1", sender: "user", text: "Hello Jonah" },
      ],
    });

    render(<JONAH deviceSize="mobileTitle" />);

    expect(screen.getByRole("heading", { name: "J.O.N.A.H" })).toHaveClass(
      "mobileTitle"
    );
    expect(
      screen.getByRole("status", { name: "J.O.N.A.H is thinking" })
    ).toBeInTheDocument();
    expect(screen.getByText("Hold On Tight!")).toBeInTheDocument();
    expect(screen.getByText(placeHolder)).toBeInTheDocument();
    expect(screen.getByText("Hello Jonah")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ask me anything you'd like!")
    ).toBeDisabled();
    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
  });

  test("JONAH renders message content as text instead of executable markup", () => {
    useJonah.mockReturnValue({
      loading: false,
      input: "",
      setInput: jest.fn(),
      onSubmit: jest.fn(),
      handleKeyDown: jest.fn(),
      messages: [
        {
          id: "hostile-1",
          sender: "jonah",
          text: '<img src=x onerror="window.compromised=true">',
        },
      ],
    });

    const { container } = render(<JONAH deviceSize="title" />);

    expect(
      screen.getByText('<img src=x onerror="window.compromised=true">')
    ).toBeInTheDocument();
    expect(container.querySelector(".messageBubble img")).toBeNull();
  });
});
