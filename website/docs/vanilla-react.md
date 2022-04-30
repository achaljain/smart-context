---
sidebar_position: 2
---

# Life without smart-context

Below are the steps for setting up state management using context.

## File 1 - Constants

```jsx
export const UPDATE_NAME = "UPDATE_NAME";
```

## File 2 - Actions

```jsx
import { UPDATE_NAME } from "./constants";

export const updateName = (payload, dispatch) => {
  dispatch({
    type: UPDATE_NAME,
    payload,
  });
};
```

## File 3 - Reducer

```jsx
import { UPDATE_NAME } from "./constants";

export const initialState = {
  name: "",
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  let newState;
  switch (type) {
    case UPDATE_NAME:
      newState = { ...state, name: payload };
      break;
    default:
      newState = state;
  }
  return newState;
};
```

## File 4 - Context

```jsx
import { createContext } from "react";
export const GlobalContext = createContext({});
```

## File 5 - Context Provider

```jsx
import React, { useReducer } from "react";

import { GlobalContext } from "./store/store";
import { initialState, reducer } from "./store/reducer";
import Comp from "./Comp";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <Comp />
    </GlobalContext.Provider>
  );
};
```

## File 6 - Access Context

```jsx
import React, { useContext } from "react";

import { updateName } from "./store/actions";
import { GlobalContext } from "./store/store";

const Comp = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { name } = state;

  const clickHandler = () => {
    updateName("smart-context", dispatch);
  };

  return (
    <>
      <button onClick={clickHandler}>Say hi</button>
      {name ? <p>Hi, {name}</p> : null}
    </>
  );
};
```

## Summary

If you are still reading, here is the quick summary:

- You need about 5 different files for one context store.
- You are maintaining a useless constants file.
- Actions are just dumb functions with no use.
- Reducer, Switch-Case, Immutability... totally your responsibility.
- Minimum 3 imports to add context provider.
- Minimum 3 imports to access any action.
- No control on actions payload. Different developers might use different patterns.
- No word about side-effects.
- Repeat everything if you plan to add a second store.
