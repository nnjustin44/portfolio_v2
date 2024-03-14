import React, { useEffect, useState } from "react";
import "./styles.scss";
import Input from "@mui/joy/Input";
import GptApiCall from "../../api/chatGPT";
import { placeHolder } from "../../AppConstants";
import { Button } from "@mui/material";

const JONAH = ({ deviceSize }) => {
  const [input, setInput] = useState("");
  const [temp, setTemp] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("Something went wrong");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (input) {
          const { response } = await GptApiCall(input);
          setResponse(response);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [input]);

  console.log("response", response);
  console.log("input", input);

  const showResponse = response ? response : placeHolder;

  return (
    <div className="jonah">
      <h1 className={deviceSize}>J.O.N.A.H</h1>
      <div className="responseWrapper">
        <div className="response">{showResponse}</div>
        <Input
          placeholder="Ask me anything you'd like"
          value={temp}
          color="primary"
          size="lg"
          variant="soft"
          onChange={(e) => setTemp(e.target.value)}
        />
        <Button className="jonahButton" onClick={() => setInput(temp)}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default JONAH;
