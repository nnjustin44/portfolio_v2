import { useRef, useState } from "react";
import { postData } from "../../api/chatGPT";
import { MAX_CHAT_MESSAGE_LENGTH, placeHolder } from "../../AppConstants";

const useJonah = () => {
  const minimumLoadingTime = 1200;
  const [loading, setLoading] = useState(false);
  const [input, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    { id: "welcome", sender: "jonah", text: placeHolder },
  ]);
  const requestStartedAt = useRef(0);
  const messageId = useRef(0);

  const setInput = (value) => {
    setInputValue(String(value ?? "").slice(0, MAX_CHAT_MESSAGE_LENGTH));
  };

  const finishAfterMinimumDelay = (callback) => {
    const elapsed = Date.now() - requestStartedAt.current;
    window.setTimeout(callback, Math.max(minimumLoadingTime - elapsed, 0));
  };

  const addMessage = (sender, text) => {
    messageId.current += 1;
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: `${sender}-${messageId.current}`, sender, text },
    ]);
  };

  const onSuccess = (data) => {
    finishAfterMinimumDelay(() => {
      setLoading(false);
      addMessage("jonah", data);
    });
  };

  const onFailure = (error) => {
    finishAfterMinimumDelay(() => {
      setLoading(false);
      addMessage(
        "jonah",
        "I couldn't reach the server. Please try your message again."
      );
      console.error("Something went wrong", error);
    });
  };

  const onSubmit = () => {
    const trimmedInput = input.trim();

    if (
      !trimmedInput ||
      trimmedInput.length > MAX_CHAT_MESSAGE_LENGTH ||
      loading
    ) {
      return;
    }

    requestStartedAt.current = Date.now();
    addMessage("user", trimmedInput);
    setInputValue("");
    setLoading(true);
    postData(trimmedInput, onSuccess, onFailure);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return { loading, input, messages, setInput, onSubmit, handleKeyDown };
};

export default useJonah;
