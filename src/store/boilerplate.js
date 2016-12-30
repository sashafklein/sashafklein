import { combineReducers } from 'redux'

const reducerObjFromHandlerWrapper = (handlers, initStates) => handlerName => {
  const handler = handlers[handlerName]
  const reducerName = handlerName.replace('Handler', '')

  const reducerFunc = (state = initStates[reducerName], action) => handler[action.type]
    ? handler[action.type](state, action)
    : state

  return { [reducerName]: reducerFunc }
}

export const constructReducers = (handlers, initStates) => {
  const reducerObjFromHandler = reducerObjFromHandlerWrapper(handlers, initStates)
  return Object.keys(handlers)
    .reduce((obj, name) => Object.assign(
      obj, reducerObjFromHandler(name)),
    {})
}

export const curryMakeRootReducer = mainReducers => asyncReducers => {
  return combineReducers({
    ...mainReducers,
    ...asyncReducers
  })
}

export const curryInjectReducer = makeRootReducer => (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}
