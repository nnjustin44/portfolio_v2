import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import useJonah from "./useJonah";
import { postData } from "../../api/chatGPT";
import { FirebaseDB } from "../../api/firebaseDB";

jest.mock("../../api/chatGPT", () => ({
  postData: jest.fn(),
}));

jest.mock("../../api/firebaseDB", () => ({
  FirebaseDB: jest.fn(),
}));

jest.mock("../../AppConstants", () => ({
  placeHolder: "PLACEHOLDER_TEXT",
}));

function TestComponent() {
  const { loading, input, setInput, onSubmit, handleKeyDown, showResponse } =
    useJonah();

  return (
    <div>
      <div data-testid="loading">{loading ? "true" : "false"}</div>
      <div data-testid="response">{showResponse}</div>
      <input
        data-testid="input"
        value={input ?? ""}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe("useJonah hook", () => {
  test("initial state shows placeholder and loading false", async () => {
    await act(async () => {
      render(<TestComponent />);
    });
    expect(screen.getByTestId("loading").textContent).toBe("false");
    expect(screen.getByTestId("response").textContent).toBe("PLACEHOLDER_TEXT");
    expect(screen.getByTestId("input")).toHaveValue("");
  });

  test("non-Enter key does not submit", async () => {
    await act(async () => {
      render(<TestComponent />);
      const input = screen.getByTestId("input");
      fireEvent.change(input, { target: { value: "Hello" } });
      await waitFor(() => {
        expect(screen.getByTestId("input")).toHaveValue("Hello");
      });
      fireEvent.keyDown(input, { key: "a", code: "KeyA" });
    });
    expect(postData).not.toHaveBeenCalled();
  });

  test("onSubmit calls postData with input and sets loading true", async () => {
    await act(async () => {
      render(<TestComponent />);
      const input = screen.getByTestId("input");
      fireEvent.change(input, { target: { value: "Hello Jonah" } });
      await waitFor(() => {
        expect(screen.getByTestId("input")).toHaveValue("Hello Jonah");
      });
      postData.mockImplementation(() => {});
      fireEvent.click(screen.getByText("Submit"));
    });
    expect(postData).toHaveBeenCalledTimes(1);
    const [passedInput, onSuccess, onFailure] = postData.mock.calls[0];
    expect(passedInput).toBe("Hello Jonah");
    expect(typeof onSuccess).toBe("function");
    expect(typeof onFailure).toBe("function");
    expect(screen.getByTestId("loading").textContent).toBe("true");
  });

  test("success path updates response, resets input, turns off loading, and writes to FirebaseDB with correct args", async () => {
    await act(async () => {
      render(<TestComponent />);
      const input = screen.getByTestId("input");
      fireEvent.change(input, { target: { value: "Original Input" } });
      await waitFor(() => {
        expect(screen.getByTestId("input")).toHaveValue("Original Input");
      });
      postData.mockImplementation((_input, onSuccess) => {
        setTimeout(() => onSuccess("AI_RESPONSE"), 0);
      });
      fireEvent.click(screen.getByText("Submit"));
    });

    expect(screen.getByTestId("loading").textContent).toBe("true");

    await act(async () => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
      expect(screen.getByTestId("response").textContent).toBe("AI_RESPONSE");
      expect(screen.getByTestId("input")).toHaveValue("");
      expect(FirebaseDB).toHaveBeenCalledTimes(1);
    });

    const [fbInput] = FirebaseDB.mock.calls[0];
    expect(fbInput).toBe("Original Input");
  });

  test("Enter key triggers submit", async () => {
    await act(async () => {
      render(<TestComponent />);
      postData.mockImplementation(() => {});
      const input = screen.getByTestId("input");
      fireEvent.change(input, { target: { value: "From Enter Key" } });
      await waitFor(() => {
        expect(screen.getByTestId("input")).toHaveValue("From Enter Key");
      });
      fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    });
    expect(postData).toHaveBeenCalledTimes(1);
    expect(postData.mock.calls[0][0]).toBe("From Enter Key");
  });

  test("failure path logs error and leaves loading true", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    await act(async () => {
      render(<TestComponent />);
      const input = screen.getByTestId("input");
      fireEvent.change(input, { target: { value: "Will Fail" } });
      await waitFor(() => {
        expect(screen.getByTestId("input")).toHaveValue("Will Fail");
      });
      postData.mockImplementation((_input, _onSuccess, onFailure) => {
        setTimeout(() => onFailure(), 0);
      });
      fireEvent.click(screen.getByText("Submit"));
    });

    await act(async () => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith("Something went wrong");
      expect(screen.getByTestId("loading").textContent).toBe("true");
    });

    logSpy.mockRestore();
  });
});
