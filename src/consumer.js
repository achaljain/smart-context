/**
 * Context consumer HOC can be used with class or function components
 */
import React, { useContext } from "react";
import { getContextParam } from "./register";
import { generateCompHOC } from "./utils";

export const getContext = (name) => getContextParam(name, "context");

const applyConsumerHOC = (WrappedComponent, ctxName) => {
  const SmartConsumer = (props) => {
    const ctxRef = getContext(ctxName);

    const ctxData = useContext(ctxRef);

    const newProps = {
      ...props,
      [ctxName]: ctxData,
    };

    return <WrappedComponent {...newProps} />;
  };

  SmartConsumer.displayName = `${ctxName.toUpperCase()}_CONSUMER`;

  return SmartConsumer;
};

const WithContextConsumer = (WrappedComponent, contextNames) =>
  generateCompHOC(WrappedComponent, contextNames, applyConsumerHOC);

export default WithContextConsumer;
