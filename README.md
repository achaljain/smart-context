# smart-context

[![npm version](https://badge.fury.io/js/smart-context.svg)](https://badge.fury.io/js/smart-context) [![Build Status](https://travis-ci.com/achaljain/smart-context.svg?branch=master)](https://travis-ci.com/achaljain/smart-context) [![Coverage Status](https://coveralls.io/repos/github/achaljain/smart-context/badge.svg?branch=master)](https://coveralls.io/github/achaljain/smart-context?branch=master) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

React state management made easy. Inspired by Redux. Powered by Context.

**v2 updates**

- Supports async actions
- Supports external lib plugins e.g immer.js

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

## Breaking changes

v2 introduces new API and features. Refer [v1 docs and example](./docs/v1.md).

- `initContext` is removed. Use `WithContextProvider` HOC
- Support for class components enabled. Added `WithContextConsumer` HOC
- Custom actions functions should return state transform function instead of new state object

## Example

React context acts as global store. It contains `state` object and `actions` that trigger state updates. All components that consume the `state` will be updated on every action dispatch.

1. Initialize with options: `actionsConfig, initialState, displayName`
2. Wrap the top level `App` component in `WithContextProvider` HOC
3. Get access to context(state, actions) via `displayName` anywhere inside the `App`.

### Initialization

Decide a top level component to initialize and plug-in `smart-context`

```jsx
// app.jsx
import React from "react";
import { WithContextProvider } from "smart-context";

const initialState = { name: "default", age: 0 };

// Two types of action definitions
const actionsConfig = {
  setName: ["name"],
  setAge: (age) => (state) => ({ ...state, age }),
};

const displayName = "myContext";

/** Config */
const config = {
  initialState,
  actionsConfig,
  displayName,
  debug: true,
};

const App = () => (
  <div id="app-container">
    All children will have access to state and actions via context
  </div>
);

// Apply multiple contexts using list of config objects
export default WithContextProvider(App, [config]);
```

### Example - Function component

```jsx
// myAwesomeComponent.jsx
import React, { useContext } from "react";
import { getContext } from "smart-context";

const MyAwesomeComponent = () => {
  // context name is required to access context
  const {
    state: { name, age },
    actions: { setName, setAge, reset },
  } = useContext(getContext("myContext"));

  const clickHandlerDefault = () => {
    // default action handler (pass object with exact key names declared in action config)
    setName({ name: "ABCD" });
  };

  const clickHandlerCustom = () => {
    // custom handler
    setAge(25);
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

export default MyAwesomeComponent;
```

### Example - Class component

```jsx
import React from "react";
import { WithContextConsumer } from "smart-context";

class DemoComp extends React.Component {
  constructor(props) {
    super(props);
    // context access via props
    this.myContextState = props.myContext.state;
  }

  render() {
    <div>{this.myContextState.name}</div>;
  }
}

// Wrap component in context consumer HOC. Access multiple contexts using displayName list
export default WithContextConsumer(DemoComp, ["myContext"]);
```

## API

Following methods are available from this package:

| Method              | Param           | Return          | Description                                  |
| ------------------- | --------------- | --------------- | -------------------------------------------- |
| WithContextProvider | React Component | React Component | Provider HOC. Accepts list of config objects |
| WithContextConsumer | React Component | React Component | Consumer HOC. Accepts list of displayName    |
| getContext          | string          | React Context   | Access context (state and actions)           |

## Initialization options

- **`displayName`**: string (mandatory)

  - acts as unique identifier of context
  - used as `displayName` in react dev tools
  - required to access the context

- **`debug`**: boolean

  - log errors related to invalid action config, action calls and state updates
  - log all successful, failed state updates

- **`initialState`**: object (not mandatory but recommended)

  - declare some initial state for predictable behavior during initial render and reset

- **`actionsConfig`**: object
  - structure: `{ actionName: [string] | function }`
  - **camelCase** is recommended for `actionName`
  - see action examples below for supported types
  - an action with name `reset` is auto-generated that restores `initialState`

## Action Types

### List - Flat object updates

Provide list of state keys for update. Action call expects an object with same keys. Any other key provided during action dispatch will be ignored.

```jsx
actionName: ["key1", "key2"];
```

### Function - Async data, deep state object, external lib integration

Provide a function that returns state transformation function

```jsx
actionName: async (payload) => {
  // Async API call here
  const data = await AsyncAPICall()

  // State transform function
  return (state) => {...state, ...data}
};
```

## Contributing

Refer [Contributing Guide](./CONTRIBUTING.md).

## License

[MIT licensed](./LICENSE).
