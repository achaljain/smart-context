/** Context provider HOC */

import React, { createContext, useReducer, useEffect } from "react";

import { setupStore } from "./manager";
import { fireLog } from "./utils";
import { registerContextParams, getContextParam } from "./register";

const generateWrapper = (WrappedComponent, config) => {
  const {
    initialState = {},
    actionsConfig = {},
    displayName = "",
    debug = false,
  } = config;

  const ProviderWrapper = getContextParam(displayName, "provider");

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
      registerContextParams({ displayName, params: { dispatch } });
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

  SmartProvider.displayName = `${displayName.toUpperCase()}_PROVIDER`;

  registerContextParams({
    displayName,
    params: {
      context: Context,
      provider: SmartProvider,
      initialState,
      debug,
    },
  });

  return SmartProvider;
};

const WithContextProvider = (WrappedComponent, configArray) => {
  try {
    const ContextWrap = configArray.reduce(
      (acc, curr) => generateWrapper(acc, curr),
      WrappedComponent
    );
    return ContextWrap;
  } catch (error) {
    fireLog(true, "error", "WithContextProvider: Config array invalid", error);
    return WrappedComponent;
  }
};

export default WithContextProvider;
