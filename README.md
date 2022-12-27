<div align="center">

<a href="https://smart-context.netlify.app" target="_blank">
<img src='assets/smart-context-logo.png' height='150' alt='Logo' aria-label='smart-context' />
</a>

<h1>smart-context</h1>

<p>React state management made easy</p>
<p>https://smart-context.netlify.app</p>

[![npm version](https://badge.fury.io/js/smart-context.svg)](https://badge.fury.io/js/smart-context) [![Build Status](https://travis-ci.com/achaljain/smart-context.svg?branch=master)](https://travis-ci.com/achaljain/smart-context) [![Coverage Status](https://coveralls.io/repos/github/achaljain/smart-context/badge.svg?branch=master)](https://coveralls.io/github/achaljain/smart-context?branch=master) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

</div>

## Highlights

- Lightweight
- Zero setup. No boilerplate
- 100% config driven
- Async actions
- Extend with plugins
- Multiple stores/contexts
- Easy Debugging
- Typescript support

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

### Create store

You can create multiple stores. All stores must have a unique name.

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

### Plugin `smart-context`

```jsx
// Wrap root component in smart-context HOC
import React from 'react'
import { WithContextProvider } from 'smart-context'

import Config from './store'

const App = ({ children }) => <div id="app-container">{children}</div>

export default WithContextProvider(App, [Config])
```

### Access store

```jsx
// myAwesomeComponent.jsx

import React from 'react'
import { useSmartContext } from 'smart-context'

const MyAwesomeComponent = () => {
  const {
    state: { name },
    actions: { setName, reset },
  } = useSmartContext('myContext')

  const clickHandler = () => {
    setName({ name: 'smart-context' })
  }

  const resetHandler = () => {
    reset()
  }

  return (
    <>
      <button onClick={clickHandler}>Say Hi</button>
      <button onClick={resetHandler}>Reset</button>
      {name ? <h1>Hi, {name}</h1> : null}
    </>
  )
}

export default MyAwesomeComponent
```

## Documentation

Visit [website](https://smart-context.netlify.app) for full documentation and demo.

## Contributing

Refer [Contributing Guide](./CONTRIBUTING.md).

## License

[MIT licensed](./LICENSE).
