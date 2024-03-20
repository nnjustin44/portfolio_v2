import React from "react";

const gpt_key = process.env.REACT_APP_GPT_API_KEY;
const gpt_url = process.env.REACT_APP_GPT_API_URL;

export const postData = (input, onSuccess, onFailure) => {
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
            "You're a helpful assistant that lives on my personal portfolio website. You're job is to only answer questions about me and tell jokes. I will provide all the documents you need below. ",
        },
        { role: "user", content: `${input}` },
      ],
    }),
  })
    .then((resp) => resp.json())
    .then((data) => onSuccess(data.choices[0].message.content))
    .catch((err) => onFailure(err));
};
