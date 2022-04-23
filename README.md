<div align="center">

<img src='assets/smart-context-logo.png' height='150' alt='Logo' aria-label='smart-context' />

<h1>smart-context</h1>

<p>React state management made easy</p>

[![npm version](https://badge.fury.io/js/smart-context.svg)](https://badge.fury.io/js/smart-context) [![Build Status](https://travis-ci.com/achaljain/smart-context.svg?branch=master)](https://travis-ci.com/achaljain/smart-context) [![Coverage Status](https://coveralls.io/repos/github/achaljain/smart-context/badge.svg?branch=master)](https://coveralls.io/github/achaljain/smart-context?branch=master) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

</div>

## Highlights

- Lightweight ( ~1.2 kb )
- Zero setup. No boilerplate
- 100% config driven
- Async actions
- Extend with plugins like Immer
- Debug mode
- Secure state updates
- Multiple stores/contexts

## Introduction

smart-context is based on in-built React features - context and hooks.

If you know React, you know smart-context. There is no new API or customization on top of React. It abstracts all the low level details of state management setup so that developers can focus on the real problem they are trying to solve.

Here is the [demo](https://react-ndsscw.stackblitz.io).

## Installation

**npm**

```sh
npm install smart-context
```

**yarn**

```sh
yarn add smart-context
```

## Getting started

You can create multiple stores. All stores must have a unique name.

Setup in 3 simple steps:

1. Create store
2. Plugin to your app
3. Access store

### Create store

```js
// store.js

// Create initial state
const initialState = { name: "" };

// Create actions
const actionsConfig = {
  setName: ["name"],
};

// Provide a good name
const displayName = "myContext";

// Setup is done! Export config
export default {
  initialState,
  actionsConfig,
  displayName,
};
```

### Plugin to your app

Add multiple stores to your app with just one line.

```jsx
// Wrap root component in smart-context HOC
import React from "react";
import { WithContextProvider } from "smart-context";

import Config from "./store";

const App = ({ children }) => <div id="app-container">{children}</div>;

export default WithContextProvider(App, [Config]);
```

### Access store

`smart-context` ready for use in entire app.

Access store via builtin `useContext` hook or `smart-context` HOC.

#### Using hook

```jsx
// myAwesomeComponent.jsx

import React, { useContext } from "react";
import { getContext } from "smart-context";

const MyAwesomeComponent = () => {
  // Access context via displayName
  const {
    state: { name },
    actions: { setName, reset },
  } = useContext(getContext("myContext"));

  const clickHandler = () => {
    setName({ name: "smart-context" });
  };

  const resetHandler = () => {
    reset();
  };

  return (
    <>
      <button onClick={clickHandler}>Say Hi</button>
      <button onClick={resetHandler}>Reset</button>
      {name ? <h1>Hi, {name}</h1> : null}
    </>
  );
};

export default MyAwesomeComponent;
```

#### Using HOC

```jsx
// demoComp.js

import React from "react";
import { WithContextConsumer } from "smart-context";

class DemoComp extends React.Component {
  constructor(props) {
    super(props);
  }

  // context is available in prop with same name
  render() {
    const { state } = props.myContext
    <div>{state.name}</div>;
  }
}

// Access multiple contexts in one line.
export default WithContextConsumer(DemoComp, ["myContext"]);
```

## Config options

- **`displayName`**: string (mandatory)

  - A unique name for context store
  - Required to access the context

- **`debug`**: boolean

  - Log errors and state updates to console

- **`initialState`**: object (not mandatory but recommended)

  - declare some initial state for predictable behavior during initial render and reset

- **`actionsConfig`**: object
  - structure: `{ actionName: [string] | function }`
  - **camelCase** is recommended for `actionName`
  - for any store, `reset` action is auto-generated that restores `initialState`

## Action Types

There are two possible action types.

### List

```jsx
actionName: ["key1", "key2"];
```

Provide list of state keys for update. Action call expects an object with same keys.

Mismatching keys in action calls are ignored.

#### Caution

This will only create shallow copy of state. Be careful if you have deep nested state object.

### Function

Provide a function that returns another function (state transform function).

State transform function gets previous state and returns new state.

This is suitable for deep nested state objects, async actions, integrate external plugins etc.

```jsx

// Async actions
actionName: async (payload) => {
  // Some API call here
  const data = await AsyncAPICall()

  // State transform function
  return (state) => {...state, ...data }
};

// Immutability with immer js
import produce from "immer";

// Reusable utility method.
// cb: state transform function
const updateWithImmer = (cb) => (state) => {
  const newSt = produce(state, cb);
  return newSt;
};

actionName: (payload) => {
  return updateWithImmer((state) => {
      state.data = 'This is just a example..'
    })
};

```

### Reset Action

A `reset` action is auto-generated if not provided in config. Restores `initialState`.

## Contributing

Refer [Contributing Guide](./CONTRIBUTING.md).

## License

[MIT licensed](./LICENSE).
