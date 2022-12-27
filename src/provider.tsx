/** Context provider HOC */

import React, { createContext, useReducer, useEffect } from 'react'

import { setupStore } from './manager'
import { generateCompHOC } from './utils'
import { registerContextParams, getContextParam } from './register'

export interface ISmartContextConfig {
  initialState: { [key: string]: any }
  actionsConfig: { [key: string]: string[] | Function }
  displayName: string
  debug?: boolean
}

const ApplyProviderHOC = (WrappedComponent, config) => {
  const {
    initialState = {},
    actionsConfig = {},
    displayName = '',
    debug = false,
  } = config

  const ProviderWrapper = getContextParam(displayName, 'provider')

  if (ProviderWrapper) {
    return ProviderWrapper
  }

  const Context = createContext({})
  Context.displayName = displayName

  const { actions, reducer } = setupStore({
    actionsConfig,
    displayName,
    debug,
  })

  // eslint-disable-next-line
  const SmartProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
      registerContextParams({ displayName, params: { dispatch } })
    }, [])

    return (
      // eslint-disable-next-line
      <Context.Provider value={{ state, actions }}>
        <WrappedComponent {...props} />
      </Context.Provider>
    )
  }

  SmartProvider.displayName = `${displayName.toUpperCase()}_PROVIDER`

  registerContextParams({
    displayName,
    params: {
      context: Context,
      provider: SmartProvider,
      initialState,
      debug,
    },
  })

  return SmartProvider
}

const WithContextProvider = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  configArray: ISmartContextConfig[]
): React.ComponentType<P> =>
  generateCompHOC(WrappedComponent, configArray, ApplyProviderHOC)

export default WithContextProvider
