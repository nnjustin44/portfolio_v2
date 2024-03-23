import React from "react";

const useDateTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const time = `${hours}:${minutes}:${seconds}`;
  const date = now.toDateString();
  return { time, date };
};

export default useDateTime;
