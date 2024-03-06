import React, { useCallback, useState } from "react";
import "./styles.scss";
import Input from "@mui/joy/Input";
import GptApiCall from "../../api/chatGPT";
import { placeHolder } from "../../AppConstants";

const JONAH = () => {
  const [input, setInput] = useState(null);
  const { response } = GptApiCall(input);
  console.log("response", response);
  console.log("input", input);

  const showResponse = response ? response : placeHolder;

  const handleSubmit = useCallback((value) => {
    setInput(value);
  }, []);

  return (
    <div className="jonah">
      <h1 className="title">J.O.N.A.H</h1>
      <div>
        <div className="response">{showResponse}</div>
        <Input
          //   className="inputField"
          //   id="first-name"
          placeholder="Ask me anything you'd like"
          value={input}
          color="primary"
          size="lg"
          variant="soft"
          onChange={(e) => handleSubmit(e.target.value)}
        />
      </div>
    </div>
  );
};

export default JONAH;
