import { postData, resolveChatBackendUrl } from "./chatGPT";

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

  test("always uses localhost:8080 from local app origins", () => {
    expect(
      resolveChatBackendUrl({
        hostname: "localhost",
        productionUrl: "https://api.example.com/api",
      })
    ).toBe("http://localhost:8080/api");
    expect(
      resolveChatBackendUrl({
        hostname: "127.0.0.1",
        productionUrl: "https://api.example.com/api",
      })
    ).toBe("http://localhost:8080/api");
  });

  test("uses production backend from deployed origins", () => {
    expect(
      resolveChatBackendUrl({
        hostname: "justinnguyen.dev",
        productionUrl: "https://api.example.com/api/",
      })
    ).toBe("https://api.example.com/api");
  });

  test("rejects localhost backend targets from deployed origins", () => {
    expect(
      resolveChatBackendUrl({
        hostname: "justinnguyen.dev",
        productionUrl: "http://localhost:8080/api",
      })
    ).toBe("");
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
      "http://localhost:8080/api/chat",
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
