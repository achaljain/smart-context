# smart-context

[![npm version](https://badge.fury.io/js/smart-context.svg)](https://badge.fury.io/js/smart-context) [![Build Status](https://travis-ci.com/achaljain/smart-context.svg?branch=master)](https://travis-ci.com/achaljain/smart-context) [![Coverage Status](https://coveralls.io/repos/github/achaljain/smart-context/badge.svg?branch=master)](https://coveralls.io/github/achaljain/smart-context?branch=master) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

React state management made easy. Inspired by Redux. Powered by Context.

**Highlights**

- Lightweight. No additional dependencies
- Based on in-built context API
- Easy configuration
- Debug mode
- Secure state updates
- Supports multiple stores/contexts
- Available in esm, cjs, umd formats

## Installation

**npm**

```sh
npm install smart-context
```

**yarn**

```sh
yarn add smart-context
```

## Example

React context acts as global store. It contains `state` object and `actions` that trigger state updates. All components that consume the `state` will be updated on every action dispatch.

1. Initialize with options: `actionsConfig, initialState, displayName`
2. Wrap the top level `App` component in the generated context wrapper
3. Get access to context(state, actions) via `displayName` anywhere inside the `App`.

Decide a top level component to initialize and plug-in `smart-context`

```jsx
// app.jsx

import React from "react";
import { initContext } from "smart-context";

const initialState = { name: "default", age: 0 };

// Age has a custom action handler function
const actionsConfig = {
  setNameAge: ["name", "age"],
  setAgeCustom: (state, action) => ({ ...state, age: action.payload.val }),
};

const displayName = "myContext";

const GlobalContext = initContext({
  initialState,
  actionsConfig,
  displayName,
  debug: true,
});

const App = () => (
  <GlobalContext>
    <div id="app-container">
      All children will have access to state and actions via context
    </div>
  </GlobalContext>
);
```

Somewhere inside `App`

```jsx
// myAwesomeComponent.jsx

import React, { useContext } from "react";
import { getContext } from "smart-context";

const MyAwesomeComponent = () => {
  // context name is required to access context
  const {
    state: { name, age },
    actions: { setNameAge, setAgeCustom, reset },
  } = useContext(getContext("myContext"));

  const clickHandlerDefault = () => {
    // default action handler (payload is object with exact key names declared in config)
    setNameAge({ name: "ABCD", age: 40 });
  };

  const clickHandlerCustom = () => {
    // custom handler (payload object can have any structure)
    setAgeCustom({ val: 25 });
  };

  const resetHandler = () => {
    // reset action is auto-generated that restores initial state
    reset();
  };

  return (
    <>
      <div>
        `Name: {name} Age: {age}`
      </div>
      <button onClick={clickHandlerDefault}>Default action type</button>
      <button onClick={clickHandlerCustom}>Custom action type</button>
      <button onClick={resetHandler}>Reset</button>
    </>
  );
};
```

## API

Following methods are available from this package:

| Method Name | Input  | Output          | Description                                                       |
| ----------- | ------ | --------------- | ----------------------------------------------------------------- |
| initContext | object | React Component | One time setup with initial state, actions list and a unique name |
| getContext  | string | React Context   | Access state and actions anywhere inside children                 |

## Initialization options

- **`displayName`**: string (mandatory)

  - acts as unique identifier of context
  - set as `displayName` in dev tools
  - required to get access to context from children

- **`debug`**: boolean

  - log errors related to invalid action config, action calls and state updates
  - log any unknown keys found in action calls
  - log all successful, failed state updates

- **`initialState`**: object

  - declare some initial state for predictable behavior during initial render and reset (recommended)

- **`actionsConfig`**: object
  - structure: `{ actionName: [string] | function }`
  - **camelCase** is recommended for `actionName`
  - value can be one of the following:
    - Array of strings: key names in state that are updated by action
    - A custom handler function that must return an updated state object: `(state, action) -> state`
  - action calls expect payload in **object** form, it is available as **action.payload** property inside action handler function
  - an action with name `reset` is auto-generated that restores `initialState`

## Contributing

Refer [Contributing Guide](./CONTRIBUTING.md).

## License

[MIT licensed](./LICENSE).
