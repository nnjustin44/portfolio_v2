import React, { useEffect, useState } from "react";
import "./styles.scss";
import Input from "@mui/joy/Input";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../api/chatGPT";
import { placeHolder } from "../../AppConstants";
import { Button } from "@mui/material";
import { FirebaseDB } from "../../api/firebaseDB";
import useDateTime from "../helpers/dateTime";

const JONAH = ({ deviceSize }) => {
  const { time, date } = useDateTime();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(null);
  const [response, setResponse] = useState(null);
  const [count, setCount] = useState(0);

  var userId = count.toString();

  console.log("input", input);
  console.log("count", count);
  console.log("userId", userId);

  const onSuccess = (data) => {
    console.log("response:", data);
    setLoading(false);
    setResponse(data);
    setInput("");
  };

  const onFailure = () => {
    console.log("Something went wrong");
  };

  const onSubmit = () => {
    postData(input, onSuccess, onFailure);
    setLoading(true);
    setCount(count + 1);
    FirebaseDB(input, time, date, userId);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const showResponse = response ? response : placeHolder;

  return (
    <div className="jonah">
      <h1 className={deviceSize}>J.O.N.A.H</h1>
      <div className="responseWrapper">
        <div className="response">
          {loading ? <CircularProgress /> : showResponse}
        </div>
        <Input
          placeholder="Ask me anything you'd like!"
          value={input}
          color="primary"
          size="lg"
          variant="soft"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button className="jonahButton" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default JONAH;
