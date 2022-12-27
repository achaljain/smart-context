---
sidebar_position: 3
---

# Getting Started

## Installation

**npm**

```sh
npm install smart-context
```

**yarn**

```sh
yarn add smart-context
```

## Quick start in 3 steps

### 1. Create store

```js
// store.js

// Create initial state
const initialState = { name: '' }

// Create actions
const actionsConfig = {
  setName: ['name'],
}

// Provide a good name
const displayName = 'myContext'

// Setup is done! Export config
export default {
  initialState,
  actionsConfig,
  displayName,
}
```

### 2. Plugin smart-context

```jsx
// Wrap root component in smart-context HOC
import React from 'react'
import { WithContextProvider } from 'smart-context'

import Config from './store'

const App = ({ children }) => <div id="app-container">{children}</div>

export default WithContextProvider(App, [Config])
```

### 3. Access store

```jsx
// myAwesomeComponent.jsx

import React from 'react'
import { useSmartContext } from 'smart-context'

const MyAwesomeComponent = () => {
  // Access context via displayName
  const {
    state: { name },
    actions: { setName },
  } = useSmartContext('myContext')

  const clickHandler = () => {
    setName({ name: 'smart-context' })
  }

  return (
    <>
      <button onClick={clickHandler}>Say Hi</button>
      {name ? <h1>Hi, {name}</h1> : null}
    </>
  )
}

export default MyAwesomeComponent
```
