import React from "react";
import "./styles.scss";

const AboutJonah = ({ deviceSize }) => {
  return (
    <div className="aboutJonah">
      <h1 className={deviceSize}>About JONAH</h1>
      <p>
        Justin's Online Native Artificial Helper is a complete Artificial
        Intelligence Assistant.
      </p>
      <p>
        Powered by OpenAI's cutting-edge technology, JONAH is designed to
        seamlessly integrate into this portfolio, providing intelligent
        assistance tailored to by my personal representative.
      </p>
      <p></p>
    </div>
  );
};

export default AboutJonah;
