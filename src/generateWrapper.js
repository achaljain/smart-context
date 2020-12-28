import React, { createContext, useReducer, useEffect } from "react";

import {
  init,
  registerDispatch,
  registerContext,
  isInvalidContextName,
} from "./stateManager";

const initContext = (config = {}) => {
  const { displayName } = config;

  const message = isInvalidContextName(displayName);

  if (message) {
    return message;
  }

  const { contextName, actions, reducer, initialState } = init(config);

  const Context = createContext({});
  Context.displayName = contextName;

  registerContext(Context);

  const WithContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
      registerDispatch(contextName, dispatch);
    }, []);

    const data = {
      state,
      actions,
    };

    return <Context.Provider value={data}>{children}</Context.Provider>;
  };

  return WithContext;
};

export default initContext;
