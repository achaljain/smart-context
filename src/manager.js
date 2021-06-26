import { getActionName, checkValidActionKey, fireLog } from "./utils";
import { getDispatch, getInitialState } from "./register";

const getDispatcher = (type, contextName) => (payload) => {
  const dispatch = getDispatch(contextName);
  return dispatch({ type, payload, contextName });
};

const createActions = (actionConfig, contextName, debug) => {
  const actions = {};
  const inValidActions = {};

  Object.keys(actionConfig).forEach((a) => {
    const actionName = getActionName(a);
    const actionEffect = actionConfig[a];

    if (typeof actionEffect === "function") {
      // Custom handler - Sync,Async,deep state object
      actions[a] = async (...params) => {
        const updatedFn = await Promise.resolve(actionEffect(...params));
        getDispatcher(actionName, contextName)(updatedFn);
      };
    } else if (checkValidActionKey(actionEffect)) {
      actions[a] = (payload) => {
        if (typeof payload !== "object") {
          fireLog(
            debug,
            "error",
            "Invalid action call. Payload must be an object",
            {
              contextName,
              actionName: a,
              expectedKeys: actionEffect,
              payload,
            }
          );
          return;
        }

        const updateObj = {};

        Object.keys(payload).forEach((k) => {
          if (actionEffect.indexOf(k) >= 0) {
            updateObj[k] = payload[k];
          }
        });

        getDispatcher(actionName, contextName)(updateObj);
      };
    } else {
      inValidActions[a] = actionEffect;
    }
  });

  actions.reset = getDispatcher("RESET", contextName);

  if (debug && Object.keys(inValidActions).length) {
    fireLog(debug, "error", "Invalid actions found in config are ignored.", {
      contextName,
      inValidActions,
    });
  }

  return { actions };
};

const createReducers = (contextName, debug) => {
  const reducer = (state, action) => {
    try {
      const { type, payload } = action;

      let newState;
      if (type === "RESET") {
        newState = getInitialState(contextName);
      } else if (typeof payload === "function") {
        newState = payload(state);
      } else {
        newState = { ...state, ...payload };
      }

      fireLog(debug, "log", "Action dispatch success", {
        contextName,
        action,
        newState,
      });
      return newState;
    } catch (error) {
      fireLog(debug, "error", "Action dispatch failed", {
        contextName,
        action,
        error,
      });

      return state;
    }
  };

  return { reducer };
};

const setupStore = ({ actionsConfig, displayName, debug }) => {
  const { actions } = createActions(actionsConfig, displayName, debug);

  const { reducer } = createReducers(displayName, debug);

  return { actions, reducer };
};

export { setupStore };
