import { fireLog, validateObject, validateActionArray } from './utils'
import { getContextParam } from './register'

const getLogger =
  (debug, displayName) =>
  (message, data, type = 'error') =>
    fireLog(debug, type, message, { displayName, data })

const dispatchAction = (type, contextName, payload, loggerFn) => {
  const dispatch = getContextParam(contextName, 'dispatch')
  if (!dispatch) {
    loggerFn('Dispatch not registered', { contextName })
    return
  }
  dispatch({ type, payload, contextName })
}

const createActions = (actionConfig, contextName, loggerFn) => {
  const actions = {} as { [key: string]: any }
  const invalidActions = {}

  Object.keys(actionConfig).forEach((a) => {
    const actionName = a
    const actionEffect = actionConfig[a]

    if (typeof actionEffect === 'function') {
      // Custom handler - Sync,Async,deep state object
      actions[a] = async (...params) => {
        const updatedFn = await Promise.resolve(actionEffect(...params))
        if (typeof updatedFn === 'function') {
          dispatchAction(actionName, contextName, updatedFn, loggerFn)
        } else {
          loggerFn('Custom action must return a state transform function', {
            actionName,
          })
        }
      }
    } else if (validateActionArray(actionEffect)) {
      actions[a] = (payload) => {
        if (!validateObject(payload)) {
          loggerFn('Action payload must be an object', {
            actionName,
            payload,
            expectedKeys: actionEffect,
          })
          return
        }

        const updateObj = {}

        actionEffect.forEach((k) => {
          if (k in payload) {
            updateObj[k] = payload[k]
          }
        })

        dispatchAction(actionName, contextName, updateObj, loggerFn)
      }
    } else {
      invalidActions[a] = actionEffect
    }
  })

  /** add reset action if not provided in config */
  if (!actions?.reset) {
    actions.reset = () =>
      dispatchAction(
        'reset',
        contextName,
        getContextParam(contextName, 'initialState'),
        loggerFn
      )
  }

  if (Object.keys(invalidActions).length) {
    loggerFn('Found invalid actions in config', { invalidActions })
  }

  return { actions }
}

const createReducers = (loggerFn) => {
  const reducer = (state, action) => {
    try {
      const { payload } = action

      let newState
      if (typeof payload === 'function') {
        newState = payload(state)
      } else {
        newState = { ...state, ...payload }
      }

      loggerFn(
        'Action dispatch success',
        {
          action,
          previousState: state,
          newState,
        },
        'log'
      )
      return newState
    } catch (error) {
      loggerFn('Action dispatch failed', { action, error })
      return state
    }
  }

  return { reducer }
}

const setupStore = ({ actionsConfig, displayName, debug }) => {
  const loggerFn = getLogger(debug, displayName)

  const { actions } = createActions(actionsConfig, displayName, loggerFn)

  const { reducer } = createReducers(loggerFn)

  return { actions, reducer }
}

export { setupStore }
