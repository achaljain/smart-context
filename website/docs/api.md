---
sidebar_position: 4
---

# API

`smart-context` exposes only 3 methods.

## WithContextProvider

HOC to plugin `smart-context` in your app. Wrap top level component in HOC.

You can add multiple context stores. All children can access stores with `displayName`.

```jsx
const App = ({ children }) => <>{children}</>;

export default WithContextProvider(App, [storeConfig1, storeConfig2]);
```

## getContext

Method to access store with `displayName`. Technically, store is a React context object.

```jsx
const SomeCompInApp = () => {
  const store1 = getContext("store1");
  const { state, actions } = useContext(store1);
};
```

## WithContextConsumer

HOC to access store. Wrap any component in HOC to access store.

You can add multiple context stores. HOC adds store as a prop with `displayName`.

```jsx
const SomeCompInApp = ({ store1, store2 }) => {
  const { state, actions } = store1;

  return <></>;
};

export default WithContextConsumer(SomeCompInApp, ["store1", "store2"]);
```

:::tip Tip

HOC is useful for class components. Prefer `useContext` hook for function components.

:::
