/** Context provider HOC */

import React, { createContext, useReducer, useEffect, useState } from "react";

import { setupStore } from "./manager";
import { generateCompHOC } from "./utils";
import { registerContextParams, getContextParam } from "./register";

const applyProviderHOC = (WrappedComponent, config) => {
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
    const [ready, setReady] = useState(false);

    useEffect(() => {
      registerContextParams({ displayName, params: { dispatch } });
      setReady(true);
    }, []);

    if (!ready) {
      return <></>;
    }

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

const WithContextProvider = (WrappedComponent, configArray) =>
  generateCompHOC(WrappedComponent, configArray, applyProviderHOC);

export default WithContextProvider;
