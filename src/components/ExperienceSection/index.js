import React from "react";

const ExperienceSection = ({ deviceSize }) => {
  return (
    <div className="experience">
      <h1 className={deviceSize}>Experience</h1>
      <p>
        I'm currently a Fullstack developer at Vergent Loan Management Systems.
        Specializing in end to end loan management software.
      </p>
      <p>
        Starting off as a developer at Fiserv since 2021. A fortune 500 company
        leading the charge in the fintech space.
      </p>
      <p>
        I had the unique opportunity of being apart of a two year rotational
        program that allowed me to experience different areas of software
        development.
      </p>
      <p>
        The first rotation was with the AI and ML team. Working on IVR's,
        chatbot utilizing IBM Watson, and later large language models such as
        GPT 3.5 Turbo. Here we used C# within .NET CORE.
      </p>

      <p>
        My second rotation was with a web development team. Specifically working
        with Javascript within React.js.
      </p>
      <p>
        This Portfolio was programmed from the ground up using React.js and
        hosted on Google Firebase. The source code can be viewed in my Github.
      </p>
    </div>
  );
};

export default ExperienceSection;
