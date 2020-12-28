import React, { useContext } from "react";
import { fireEvent, render } from "@testing-library/react";

import { initContext, getContext } from "../index";

const getMockComp = () => {
  const MockComp = () => {
    const {
      state: { dummy },
      actions: { setDummy },
    } = useContext(getContext("testCtx"));

    const fireAction = () => {
      setDummy({ dummy: 2 });
    };

    return (
      <div id="comp">
        <span>{`Context: ${dummy}`}</span>
        <button type="button" onClick={fireAction}>
          dispatch
        </button>
      </div>
    );
  };

  return <MockComp />;
};

describe("Context wrapper", () => {
  let Component;

  beforeAll(() => {
    const actionsConfig = { setDummy: ["dummy"] };
    const initialState = { dummy: 0 };

    const App = ({ children }) => <div id="app">{children}</div>;

    const WithContext = initContext({
      actionsConfig,
      initialState,
      displayName: "testCtx",
    });

    Component = render(
      <WithContext>
        <App>{getMockComp()}</App>
      </WithContext>
    );
  });

  it("should render properly and dispatch action", () => {
    expect(Component.getByText(/Context: 0/gi)).toBeTruthy();
    fireEvent.click(Component.getByRole("button"));
    expect(Component.getByText(/Context: 2/gi)).toBeTruthy();
  });

  it("should not init with invalid name", () => {
    const noName = initContext();
    expect(noName).toBe(`Context name not valid: ${undefined}`);

    const emptyName = initContext({ displayName: "" });
    expect(emptyName).toBe(`Context name not valid: ${""}`);

    const duplicate = initContext({ displayName: "testCtx" });
    expect(duplicate).toBe(`Context already initialized: testCtx`);
  });
});
