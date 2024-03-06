import React, { useState } from "react";
import "./styles.scss";
import { Box, Input } from "@mui/material";
import GptApiCall from "../../api/chatGPT";
import { placeHolder } from "../../AppConstants";

const JONAH = () => {
  const [input, setInput] = useState();
  const { response } = GptApiCall(input);
  console.log("response", response);
  console.log("input", input);

  const showResponse = input ? response : placeHolder;

  return (
    <div className="jonah">
      <h1 className="title">J.O.N.A.H</h1>
      <div className="jonahBody">
        {showResponse}
        <Input
          className="inputField"
          id="first-name"
          placeholder="Ask me anything you'd like"
          color="primary"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export default JONAH;
