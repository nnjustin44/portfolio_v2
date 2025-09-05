import React, { useEffect, useState } from "react";
import "./styles.scss";
import Input from "@mui/joy/Input";
import CircularProgress from "@mui/material/CircularProgress";
import useJonah from "./useJonah";
import { Button } from "@mui/material";

const JONAH = ({ deviceSize }) => {
  const { loading, input, setInput, onSubmit, handleKeyDown, showResponse } =
    useJonah();

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
