import React from "react";

export const postData = async (input, onSuccess, onFailure) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  try {
    const response = await fetch(`${backendUrl}/chat`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: input,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${
          errorData.message || "Unknown error"
        }`
      );
    }

    const data = await response.json();
    onSuccess(data.response);
  } catch (err) {
    onFailure(err);
  }
};
