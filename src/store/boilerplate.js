const reducerObjFromHandlerWrapper = handlers => (handlerName, initStates) => {
  const handler = handlers[handlerName]
  const reducerName = handlerName.replace('Handler', '')

  const reducerFunc = (state = initStates[reducerName], action) => handler[action.type]
    ? handler[action.type](state, action)
    : state

  return { [reducerName]: reducerFunc }
}

export const constructReducers = (handlers, initStates) => {
  const reducerObjFromHandler = reducerObjFromHandlerWrapper(handlers)
  return Object.keys(handlers)
    .reduce((obj, name) => Object.assign(
      obj, reducerObjFromHandler(name, initStates)),
    {})
}
