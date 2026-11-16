import {
  MAX_CHAT_MESSAGE_LENGTH,
  MAX_CHAT_RESPONSE_LENGTH,
} from "../AppConstants";

const LOCAL_CHAT_BACKEND_URL = "http://localhost:8080/api";
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);

const normalizeBackendUrl = (url) => (url || "").replace(/\/+$/, "");

const isLocalAppOrigin = (hostname) => LOCAL_HOSTNAMES.has(hostname);

const isLocalBackendTarget = (backendUrl) => {
  try {
    return LOCAL_HOSTNAMES.has(new URL(backendUrl).hostname);
  } catch {
    return false;
  }
};

export const resolveChatBackendUrl = ({
  hostname = window.location.hostname,
  productionUrl = process.env.REACT_APP_BACKEND_URL,
} = {}) => {
  if (isLocalAppOrigin(hostname)) {
    return LOCAL_CHAT_BACKEND_URL;
  }

  const normalizedProductionUrl = normalizeBackendUrl(productionUrl);

  if (isLocalBackendTarget(normalizedProductionUrl)) {
    return "";
  }

  return normalizedProductionUrl;
};

const parseResponseBody = async (response) => {
  const body = await response.text();
  try {
    const data = JSON.parse(body);
    return typeof data === "string" ? { message: data } : (data || {});
  } catch {
    // The backend can label plain-text error responses as application/json.
    return { message: body };
  }
};

export const postData = async (input, onSuccess, onFailure) => {
  const backendUrl = resolveChatBackendUrl();
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
      const error = new Error(
        `Chat request failed (${response.status} ${response.statusText}): ${
          errorData.message || errorData.error || "Unknown error"
        }`
      );
      error.status = response.status;
      throw error;
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
