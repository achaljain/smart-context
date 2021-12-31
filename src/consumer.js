/**
 * Context consumer HOC can be used with class or function components
 */
import React, { useContext } from "react";
import { getContextParam } from "./register";
import { validateConfigArray } from "./utils";

export const getContext = (name) => getContextParam(name, "context");

const getWrapper = (WrappedComponent, ctxName) => {
  const ctxRef = getContext(ctxName);

  if (!ctxRef) {
    return WrappedComponent;
  }

  const SmartConsumer = (props) => {
    const ctxData = useContext(ctxRef);

    const newProps = {
      ...props,
      [`${ctxRef.displayName}`]: ctxData,
    };

    return <WrappedComponent {...newProps} />;
  };

  SmartConsumer.displayName = `${ctxName.toUpperCase()}_CONSUMER`;

  return SmartConsumer;
};

const WithContextConsumer = (WrappedComponent, contextNames) => {
  if (!validateConfigArray(contextNames)) {
    throw new Error("WithContextConsumer: Context name array invalid");
  }

  const ContextWrap = contextNames.reduce(
    (acc, curr) => getWrapper(acc, curr),
    WrappedComponent
  );

  return ContextWrap;
};

export default WithContextConsumer;