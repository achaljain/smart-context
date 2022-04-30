---
sidebar_position: 6
---

# Action Types

Actions can be defined in two ways.

## List

Simplest way to define an action.

This ensures secure immutable state updates for the keys declared in config.

Any mismatching keys in action calls are ignored. Store is safe from any random update.

```jsx
// action config
const actionsConfig = {
  actionName: ["key1", "key2"],
};

// action call in some component
actionName({
  key1: "some value..",
  key2: "some value..",

  // key3 is ignored because it is not part of config
  key3: "some value..",
});
```

:::caution

This will create a shallow copy of state. Be careful, if you have deep nested state object.

:::

## Function

Fine-grained control on every action.

A function that returns a `state transform function`.

State updates and immutability completely depends on `state transform function`.

Use this method of async actions, external plugins, deep state objects.

```jsx
// action config
const actionsConfig = {
  actionName: (params) => {
    // do something and return state transform function

    return (prevState) => {
      const newState = { ...prevState, data: "This is just an example.." };
      return newState;
    };
  },
};

// action call in some component
actionName(params);
```

:::tip State transform function

Returns new state based in previous state and action params.

:::

## Examples

### Async action

```jsx
const actionsConfig = {
  actionName: async (payload) => {
    // Some API call here
    const data = await AsyncAPICall()

    // State transform function
    return (state) => {...state, ...data }
  }
}

```

### Immer plugin

```js
import produce from "immer";

// Reusable utility method
const updateWithImmer = (cb) => (state) => {
  const newSt = produce(state, cb);
  return newSt;
};

// actions config
const actionsConfig = {
  actionName: (payload) => {
    return updateWithImmer((state) => {
      state.data = "This is just an example..";
    });
  },
};
```
