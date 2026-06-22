import React, { useEffect, useRef } from "react";
import "./styles.scss";
import Input from "@mui/joy/Input";
import useJonah from "./useJonah";
import { Button } from "@mui/material";
import AstronautLoader from "./AstronautLoader";
import { MAX_CHAT_MESSAGE_LENGTH } from "../../AppConstants";

const JONAH = ({ deviceSize }) => {
  const { loading, input, messages, setInput, onSubmit, handleKeyDown } =
    useJonah();
  const chatLogRef = useRef(null);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [loading, messages]);

  return (
    <div className="jonah">
      <h1 className={deviceSize}>J.O.N.A.H</h1>
      <div className="chatPanel">
        <div
          className="chatLog"
          ref={chatLogRef}
          role="log"
          aria-label="Conversation with J.O.N.A.H"
          aria-live="polite"
        >
          {messages.map(({ id, sender, text }) => (
            <div className={`messageRow ${sender}`} key={id}>
              <div className="messageBubble">
                <span className="messageAuthor">
                  {sender === "user" ? "You" : "J.O.N.A.H"}
                </span>
                <p>{text}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="messageRow jonah loadingMessage">
              <AstronautLoader />
            </div>
          )}
        </div>
        <div className="composer">
          <Input
            placeholder="Ask me anything you'd like!"
            value={input}
            color="primary"
            size="lg"
            variant="soft"
            disabled={loading}
            endDecorator={`${input.length}/${MAX_CHAT_MESSAGE_LENGTH}`}
            slotProps={{ input: { maxLength: MAX_CHAT_MESSAGE_LENGTH } }}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button className="jonahButton" disabled={loading} onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JONAH;
