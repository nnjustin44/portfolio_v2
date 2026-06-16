import { useState } from "react";
import { postData } from "../../api/chatGPT";
import { placeHolder } from "../../AppConstants";
import { FirebaseDB } from "../../api/firebaseDB";
import useDateTime from "../helpers/dateTime";

const useJonah = () => {
  const { time, date } = useDateTime();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const onSuccess = (data) => {
    setLoading(false);
    setResponse(data);
    setInput("");
    Promise.resolve(FirebaseDB(input.trim(), time, date, data)).catch((error) => {
      console.error("Error writing JONAH interaction: ", error);
    });
  };

  const onFailure = (error) => {
    setLoading(false);
    console.error("Something went wrong", error);
  };

  const onSubmit = () => {
    const trimmedInput = input.trim();

    if (!trimmedInput || loading) {
      return;
    }

    postData(trimmedInput, onSuccess, onFailure);
    setLoading(true);
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
