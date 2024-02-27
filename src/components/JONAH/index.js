import React from "react";
import TextField from "@mui/material/TextField";
import "./styles.scss";
const JONAH = () => {
  return (
    <>
      <TextField
        className="textField"
        id="first-name"
        label="Ask me anything you'd like"
        // value={this.state.name}
        // onChange={this.handleChange("name")}
        // margin="normal"
      />
    </>
  );
};

export default JONAH;
