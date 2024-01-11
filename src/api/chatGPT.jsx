import React, { useState, useEffect } from "react";

const gpt_key = process.env.REACT_APP_GPT_API_KEY;
const gpt_url = process.env.REACT_APP_GPT_API_URL;

const GptApiCall = () => {
  useEffect(() => {
    const fetchData = async () => {
      fetch(gpt_url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${gpt_key}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: "Say Hello" }],
        }),
      })
        .then((resp) => resp.json())
        .then((data) => console.log(data.choices[0].message.content))
        .catch((err) => console.log(err));
    };
    fetchData();
  });

  return <div></div>;
};

export default GptApiCall;
