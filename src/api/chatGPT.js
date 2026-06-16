const parseJsonResponse = async (response) => {
  try {
    return await response.json();
  } catch {
    return {};
  }
};

export const postData = async (input, onSuccess, onFailure) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const message = input.trim();

  if (!backendUrl) {
    onFailure(new Error("Missing REACT_APP_BACKEND_URL configuration"));
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
      const errorData = await parseJsonResponse(response);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${
          errorData.message || "Unknown error"
        }`
      );
    }

    const data = await parseJsonResponse(response);

    if (typeof data.response !== "string") {
      throw new Error("Backend returned an invalid response");
    }

    onSuccess(data.response);
  } catch (err) {
    onFailure(err);
  }
};
