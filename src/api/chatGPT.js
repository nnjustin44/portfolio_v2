import {
  MAX_CHAT_MESSAGE_LENGTH,
  MAX_CHAT_RESPONSE_LENGTH,
} from "../AppConstants";

const parseResponseBody = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      return await response.json();
    }

    return { message: await response.text() };
  } catch {
    return {};
  }
};

export const postData = async (input, onSuccess, onFailure) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const message = typeof input === "string" ? input.trim() : "";

  if (!backendUrl) {
    onFailure(new Error("Missing REACT_APP_BACKEND_URL configuration"));
    return;
  }

  if (!message || message.length > MAX_CHAT_MESSAGE_LENGTH) {
    onFailure(
      new Error(
        `Chat messages must be between 1 and ${MAX_CHAT_MESSAGE_LENGTH} characters`
      )
    );
    return;
  }

  try {
    const response = await fetch(`${backendUrl}/chat`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    if (!response.ok) {
      const errorData = await parseResponseBody(response);
      throw new Error(
        `Chat request failed (${response.status} ${response.statusText}): ${
          errorData.message || "Unknown error"
        }`
      );
    }

    const data = await parseResponseBody(response);

    if (
      typeof data.response !== "string" ||
      data.response.length > MAX_CHAT_RESPONSE_LENGTH
    ) {
      throw new Error("Backend returned an invalid response");
    }

    onSuccess(data.response);
  } catch (err) {
    onFailure(err);
  }
};
