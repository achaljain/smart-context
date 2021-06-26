/**
 * Context consumer HOC can be used with class or function components
 */
import React from "react";
import getContext from "./register";
import { validateConfigArray } from "./utils";

const getWrapper = (WrappedComponent, CtxName) => {
  const SmartConsumer = (props) => {
    const CtxRef = getContext(CtxName);

    if (!CtxRef) {
      return <WrappedComponent {...props} />;
    }

    return (
      <CtxRef.Consumer>
        {({ state, actions }) => {
          const newProps = {};
          newProps[`${CtxRef.displayName}`] = {
            state,
            actions,
          };
          return <WrappedComponent {...props} {...newProps} />;
        }}
      </CtxRef.Consumer>
    );
  };

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
