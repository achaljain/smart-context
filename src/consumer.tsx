import React, { Context, useContext } from 'react'
import { getContextParam } from './register'
import { generateCompHOC } from './utils'

export interface ISmartContext {
  state: { [key: string]: any }
  actions: { [key: string]: Function }
}

export const getContext = (name: string): Context<ISmartContext> =>
  getContextParam(name, 'context')

export const useSmartContext = (name: string): ISmartContext =>
  useContext(getContextParam(name, 'context'))

const ApplyConsumerHOC = (WrappedComponent, ctxName) => {
  // eslint-disable-next-line
  const SmartConsumer = (props) => {
    const ctxData = useSmartContext(ctxName)

    const newProps = {
      ...props,
      [ctxName]: ctxData,
    }

    return <WrappedComponent {...newProps} />
  }

  SmartConsumer.displayName = `${ctxName.toUpperCase()}_CONSUMER`

  return SmartConsumer
}

const WithContextConsumer = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  contextNames: string[]
): React.ComponentType<P> =>
  generateCompHOC(WrappedComponent, contextNames, ApplyConsumerHOC)

export default WithContextConsumer
