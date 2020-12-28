import { getContext, init, registerDispatch } from "../stateManager";

describe("state manager helper functions", () => {
  const mockFn = jest.fn();
  const dispatchMock = jest.fn();

  let contextName;
  let stateRef;
  let reducerRef;
  let actionRef;

  beforeAll(() => {
    const { contextName: ctxName, actions, reducer, initialState } = init({
      actionsConfig: {
        setDummy: ["dummy"],
        setCustom: mockFn,
        setInvalid: "abc",
      },
      initialState: { dummy: 0 },
      debug: true,
      displayName: "smartContext",
    });

    stateRef = initialState;
    reducerRef = reducer;
    actionRef = actions;
    contextName = ctxName;

    registerDispatch(contextName, dispatchMock);
  });

  it("should create and dispatch only valid actions", () => {
    expect(Object.keys(actionRef).indexOf("setInvalid")).toEqual(-1);
    const { setDummy } = actionRef;
    setDummy({ dummy: 3 });
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "SET_DUMMY",
      payload: { dummy: 3 },
      contextName: "smartContext",
    });
  });

  it("should dispatch to custom handler with valid payload", () => {
    const { setCustom } = actionRef;
    setCustom({ dummy: 2 });
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "SET_CUSTOM",
      payload: { dummy: 2 },
      contextName,
    });
  });

  it("should not dispatch with invalid payload", () => {
    const { setCustom } = actionRef;
    setCustom(2);
    expect(dispatchMock).toHaveBeenCalledTimes(2);
  });

  it("should ignore payload and dispatch reset", () => {
    const { reset } = actionRef;
    reset(2);
    expect(dispatchMock).toHaveBeenCalledTimes(3);
  });

  it("reducer should return updated state with default handler", () => {
    const s = reducerRef(stateRef, {
      type: "SET_DUMMY",
      payload: { dummy: 2 },
      contextName,
    });
    expect(s).toEqual({ dummy: 2 });
  });

  it("should return initial state on reset", () => {
    const s = reducerRef(stateRef, {
      type: "RESET",
      payload: { dummy: 2 },
      contextName,
    });
    expect(s).toEqual({ dummy: 0 });
  });

  it("should return current state for missing payload", () => {
    const s = reducerRef(
      { dummy: 3 },
      {
        type: "SET_DUMMY",
        payload: { otherProp: 1 },
        contextName,
      }
    );
    expect(s).toEqual({ dummy: 3 });
  });

  it("should init with default values", () => {
    const s = init({ displayName: "smartContext2", debug: true });
    expect(s.contextName).toEqual("smartContext2");
    expect(s.actions).toBeTruthy();
  });

  it("should catch error and restore previous state", () => {
    const s = reducerRef(
      { dummy: 3 },
      {
        type: "ERROR_ACTION",
        payload: { otherProp: 1 },
        contextName,
      }
    );
    expect(s).toEqual({ dummy: 3 });
  });

  it("should return object with error info for invalid context", () => {
    const ctx = getContext("noCtx");
    expect(ctx).toEqual({ error: `Context noCtx not found` });
  });
});
