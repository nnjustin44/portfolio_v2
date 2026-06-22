import { postData } from "./chatGPT";

describe("postData", () => {
  const originalBackendUrl = process.env.REACT_APP_BACKEND_URL;

  beforeEach(() => {
    process.env.REACT_APP_BACKEND_URL = "https://api.example.com/api";
    global.fetch = jest.fn();
  });

  afterEach(() => {
    process.env.REACT_APP_BACKEND_URL = originalBackendUrl;
    jest.restoreAllMocks();
  });

  test("rejects messages longer than 500 characters without making a request", async () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();

    await postData("a".repeat(501), onSuccess, onFailure);

    expect(fetch).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onFailure).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Chat messages must be between 1 and 500 characters",
      })
    );
  });

  test("sends a trimmed message and returns a validated response", async () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => "application/json" },
      json: async () => ({ response: "Hello" }),
    });

    await postData("  Hi  ", onSuccess, onFailure);

    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.com/api/chat",
      expect.objectContaining({
        body: JSON.stringify({ message: "Hi" }),
        method: "POST",
      })
    );
    expect(onSuccess).toHaveBeenCalledWith("Hello");
    expect(onFailure).not.toHaveBeenCalled();
  });

  test("rejects oversized backend responses", async () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => "application/json" },
      json: async () => ({ response: "a".repeat(4001) }),
    });

    await postData("Hi", onSuccess, onFailure);

    expect(onSuccess).not.toHaveBeenCalled();
    expect(onFailure).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Backend returned an invalid response",
      })
    );
  });
});
