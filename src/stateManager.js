import { getActionName, checkValidActionKey, logger } from "./utils";

const stateRegister = {};

const fireLog = (contextName, type, message, data) => {
  const { debug } = stateRegister[contextName];
  if (debug) {
    logger(type, message, data);
  }
};

const registerDispatch = (contextName, dispatch) => {
  stateRegister[contextName].dispatch = dispatch;
};

const registerContext = (context) => {
  const { displayName } = context;
  stateRegister[displayName].context = context;
};

const getDispatcher = (type, contextName) => (payload) => {
  if (typeof payload !== "object" && type !== "RESET") {
    fireLog(
      contextName,
      "error",
      `Invalid action call. Payload must be an object`,
      { contextName, type, payload }
    );
    return null;
  }
  return stateRegister[contextName].dispatch({ type, payload, contextName });
};

const createActions = (actionConfig, contextName) => {
  const actionTypes = {};
  const actions = {};
  const inValidActions = {};

  Object.keys(actionConfig).forEach((a) => {
    const actionName = getActionName(a);
    const actionEffect = actionConfig[a];

    if (typeof actionEffect === "function") {
      actionTypes[actionName] = { handler: actionEffect };
      actions[a] = getDispatcher(actionName, contextName);
    } else if (checkValidActionKey(actionEffect)) {
      actionTypes[actionName] = { keys: actionEffect };
      actions[a] = getDispatcher(actionName, contextName);
    } else {
      inValidActions[a] = actionEffect;
    }
  });

  actionTypes.RESET = { keys: [] };
  actions.reset = getDispatcher("RESET", contextName);

  if (Object.keys(inValidActions).length) {
    fireLog(
      contextName,
      "error",
      "Invalid actions found in config. They are ignored.",
      { contextName, inValidActions }
    );
  }

  stateRegister[contextName].actionTypes = actionTypes;

  return { actions };
};

const defaultHandler = (state, action) => {
  const { type, payload, contextName } = action;
  const { actionTypes, getInitialState } = stateRegister[contextName];

  if (type === "RESET") {
    return getInitialState();
  }

  const updateObj = {};
  const ignoredKeys = {};

  actionTypes[type].keys.forEach((k) => {
    if (k in payload) {
      updateObj[k] = payload[k];
    } else {
      updateObj[k] = state[k];
      ignoredKeys[type] = { payload, contextName };
    }

    if (Object.keys(ignoredKeys).length) {
      fireLog(
        contextName,
        "warn",
        "Unknown keys in action payload are ignored",
        { contextName, ignoredKeys }
      );
    }
  });
  return { ...state, ...updateObj };
};

const createReducers = (contextName) => {
  const initialState = stateRegister[contextName].getInitialState();

  const reducer = (state, action) => {
    try {
      const { type } = action;
      const { actionTypes } = stateRegister[contextName];
      const handler = actionTypes[type].handler || defaultHandler;
      const newState = handler(state, action);

      fireLog(contextName, "log", "Action Dispatch Success", {
        contextName,
        action,
        newState,
      });

      return newState;
    } catch (error) {
      fireLog(contextName, "error", "Action Dispatch Failed", {
        contextName,
        action,
        error: {
          message: "Error in reducer. Check action config and dispatch call.",
        },
      });
      return state;
    }
  };

  return { reducer, initialState };
};

const init = ({
  actionsConfig = {},
  initialState: stateConfig = {},
  debug = false,
  displayName: contextName,
}) => {
  stateRegister[contextName] = {
    getInitialState: () => JSON.parse(JSON.stringify(stateConfig)),
    debug,
  };

  const { actions } = createActions(actionsConfig, contextName);

  const { reducer, initialState } = createReducers(contextName);

  return { contextName, actions, reducer, initialState };
};

const isInvalidContextName = (displayName) => {
  if (typeof displayName !== "string" || displayName === "") {
    return `Context name not valid: ${displayName}`;
  }

  if (stateRegister[displayName]) {
    return `Context already initialized: ${displayName}`;
  }

  return false;
};

const getContext = (name) =>
  stateRegister[name]
    ? stateRegister[name].context
    : { error: `Context ${name} not found` };

export {
  init,
  registerDispatch,
  registerContext,
  getContext,
  isInvalidContextName,
};
