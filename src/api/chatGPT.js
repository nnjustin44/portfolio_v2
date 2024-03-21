import React from "react";
import { trainingContext } from "../components/helpers/jonahHelper";
const gpt_key = process.env.REACT_APP_GPT_API_KEY;
const gpt_url = process.env.REACT_APP_GPT_API_URL;

export const postData = async (input, onSuccess, onFailure) => {
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
          content: `${trainingContext}`,
        },
        { role: "user", content: `${input}` },
      ],
    }),
  })
    .then((resp) => resp.json())
    .then((data) => onSuccess(data.choices[0].message.content))
    .catch((err) => onFailure(err));
};
