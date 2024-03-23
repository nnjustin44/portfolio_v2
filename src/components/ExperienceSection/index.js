import React from "react";

const ExperienceSection = ({ deviceSize }) => {
  return (
    <div className="experience">
      <h1 className={deviceSize}>Experience</h1>
      <p>
        I currently hold the position of Fullstack Developer at Vergent Loan
        Management Systems, where my focus lies in developing comprehensive loan
        management software solutions from inception to deployment.
      </p>
      <p>
        My journey commenced as a developer at Fiserv in 2021, a distinguished
        Fortune 500 company at the forefront of the fintech industry.
      </p>
      <p>
        During my tenure at Fiserv, I had the privilege of participating in a
        unique two-year rotational program, which provided me with invaluable
        exposure to various facets of software development.
      </p>
      <p>
        In my initial rotation, I collaborated with the AI and ML team,
        contributing to projects involving IVRs and chatbots powered by IBM
        Watson, and later delving into the utilization of advanced language
        models like GPT 3.5 Turbo. Allowing to to utilize generative AI to crete
        J.O.N.A.H. This experience involved extensive use of C# within the .NET
        CORE framework.
      </p>

      <p>
        Subsequently, I transitioned to a web development team for my second
        rotation, where I specialized in Javascript within the React.js
        ecosystem.
      </p>
      <p>
        One of the notable accomplishments I achieved during this timeframe was
        the creation of a robust portfolio website utilizing React.js. This
        website was seamlessly integrated and hosted on Google Firebase,
        complete with a fully functional database. Notably, the design was
        optimized for both mobile and desktop usage, ensuring a smooth user
        experience across all devices.
      </p>
      <p>
        For those interested, the entire source code for this project is
        accessible for review on my GitHub repository.
      </p>
    </div>
  );
};

export default ExperienceSection;
