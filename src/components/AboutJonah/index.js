import React from "react";
import "./styles.scss";

const AboutJonah = ({ deviceSize }) => {
  return (
    <div className="aboutJonah">
      <h1 className={deviceSize}>About JONAH</h1>
      <p>
        Introducing Justin's Online Native Artificial Helper. Powered by OpenAI,
        JONAH is trained with my resume and hobbies. JONAH is tailored to be my
        personal representative and can answer any questions you may have on my
        behalf. JONAH is connected to a database and can learn from your
        responses.
      </p>
    </div>
  );
};

export default AboutJonah;
