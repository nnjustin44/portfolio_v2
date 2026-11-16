import React from "react";

const ExperienceSection = ({ deviceSize }) => {
  return (
    <div className="experience">
      <div className="sectionIntro"><span>02</span><p>Selected experience</p></div>
      <h1 className={deviceSize} aria-label="Experience">Building across<br/><em>the full stack.</em></h1>
      <div className="experienceCopy">
        <p>
          I am a Fullstack Developer, my focus lies in developing comprehensive
          software solutions from inception to deployment.
        </p>
        <p className="aiCapability">
          I specialize in integrating AI into production applications—designing
          intelligent workflows that automate repetitive work, surface useful
          insights, and help teams analyze complex information with greater speed
          and clarity.
        </p>
        <p>
          My journey as a developer began at Fiserv in 2021, a distinguished
          Fortune 500 company at the forefront of the Fintech industry.
        </p>
        <p>
          During my tenure at Fiserv, I had the privilege of participating in a
          unique two-year rotational program, which provided me with invaluable
          exposure to various facets of software development.
        </p>
        <p>
          In my initial rotation, I collaborated with the AI and ML team,
          contributing to projects involving IVRs and chatbots powered by IBM
          Watson, and later developing into the utilization of advanced language
          models like GPT 3.5 Turbo (At the time, cutting edge). Allowing me the
          experience to utilize generative AI in the creation of J.O.N.A.H. This
          experience involved extensive use of C# within the .NET CORE framework.
        </p>
        <p>
          Subsequently, I transitioned to a web development team for my second
          rotation, where I specialized in Javascript within the React.js, C# .NET
          CORE, ecosystem.
        </p>
        <p>
          One of the notable accomplishments I achieved during this timeframe was
          the creation of a robust portfolio website utilizing React.js/ Java
          Quarkus. This website was seamlessly integrated and hosted on Google
          Firebase, complete with a fully functional database in Google Cloud.
          Notably, the design was optimized for both mobile and desktop usage,
          ensuring a smooth user experience across all devices.
        </p>
        <p>
          For those interested, the entire source code for this project is
          accessible for review on my GitHub repository.
        </p>
      </div>
    </div>
  );
};

export default ExperienceSection;
