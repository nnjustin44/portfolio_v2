import React, { useEffect, useState } from "react";
import "./styles.scss";
import Input from "@mui/joy/Input";
import GptApiCall from "../../api/chatGPT";
import { placeHolder } from "../../AppConstants";
import { Button } from "@mui/material";

const JONAH = ({ deviceSize }) => {
  const [input, setInput] = useState("");
  //   const [temp, setTemp] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (input) {
          const { response } = GptApiCall(input);
          setResponse(response);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [input]);

  console.log("input", input);
  console.log("response", response);

  const showResponse = response ? response : placeHolder;

  return (
    <div className="jonah">
      <h1 className={deviceSize}>J.O.N.A.H</h1>
      <div className="responseWrapper">
        <div className="response">{showResponse}</div>
        <Input
          placeholder="Ask me anything you'd like"
          value={input}
          color="primary"
          size="lg"
          variant="soft"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button className="jonahButton" onClick={() => GptApiCall(input)}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default JONAH;
