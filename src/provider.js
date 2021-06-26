/** Context provider HOC */

import React, { createContext, useReducer, useEffect } from "react";

import { setupStore } from "./manager";
import { validateStringLiteral, validateConfigArray } from "./utils";
import { registerContext, registerDispatch, getProvider } from "./register";

const generateWrapper = (WrappedComponent, config) => {
  const {
    initialState = {},
    actionsConfig = {},
    displayName = "",
    debug = false,
  } = config;

  if (!validateStringLiteral(displayName)) {
    const message = `Context name not valid: ${displayName}.`;
    throw new Error(message);
  }

  const ProviderWrapper = getProvider(displayName);

  if (ProviderWrapper) {
    return ProviderWrapper;
  }

  const Context = createContext({});
  Context.displayName = displayName;

  const { actions, reducer } = setupStore({
    actionsConfig,
    displayName,
    debug,
  });

  const SmartProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
      registerDispatch({ displayName, dispatch });
    }, []);

    const data = {
      state,
      actions,
    };

    return (
      <Context.Provider value={data}>
        <WrappedComponent {...props} />
      </Context.Provider>
    );
  };

  registerContext({
    context: Context,
    provider: SmartProvider,
    initialState,
    debug,
  });

  return SmartProvider;
};

const WithContextProvider = (WrappedComponent, configArray) => {
  if (!validateConfigArray(configArray)) {
    throw new Error("WithContextProvider: Config array invalid");
  }

  const ContextWrap = configArray.reduce(
    (acc, curr) => generateWrapper(acc, curr),
    WrappedComponent
  );

  return ContextWrap;
};

export default WithContextProvider;
