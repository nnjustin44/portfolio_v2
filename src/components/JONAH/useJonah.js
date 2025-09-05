import React, { useEffect, useState } from "react";
import { postData } from "../../api/chatGPT";
import { placeHolder } from "../../AppConstants";
import { FirebaseDB } from "../../api/firebaseDB";
import useDateTime from "../helpers/dateTime";

const useJonah = () => {
  const { time, date } = useDateTime();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(null);
  const [response, setResponse] = useState(null);
  const [count, setCount] = useState(0);

  var userId = count.toString();

  const onSuccess = (data) => {
    setLoading(false);
    setResponse(data);
    setInput("");
    FirebaseDB(input, time, date, userId, data);
  };

  const onFailure = () => {
    console.log("Something went wrong");
  };

  const onSubmit = () => {
    postData(input, onSuccess, onFailure);
    setLoading(true);
    setCount(count + 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const showResponse = response ? response : placeHolder;

  return { loading, input, setInput, onSubmit, handleKeyDown, showResponse };
};

export default useJonah;
