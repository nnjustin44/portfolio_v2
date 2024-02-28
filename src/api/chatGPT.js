import React, { useState, useEffect } from "react";

const gpt_key = process.env.REACT_APP_GPT_API_KEY;
const gpt_url = process.env.REACT_APP_GPT_API_URL;

console.log("gpt_url:", gpt_url);
console.log("key:", gpt_key);
const GptApiCall = (input) => {
  const [response, setResponse] = useState();
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
          messages: [
            {
              role: "system",
              content:
                "You're a helpful assistant that lives on my personal portfolio website. You're job is to only answer questions about me. I will provide all the documents you need below. ",
            },
            { role: "user", content: `${input}` },
          ],
        }),
      })
        .then((resp) => resp.json())
        .then((data) => setResponse(data.choices[0].message.content))
        .catch((err) => console.log(err));
    };
    fetchData();
  });
  return { response };
};

export default GptApiCall;
