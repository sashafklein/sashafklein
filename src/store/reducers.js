import { combineReducers } from 'redux'
import { constructReducers } from './boilerplate'

// Handlers map actions to reducing functions.
// Init and default states are added by constructReducers function.
const counterHandler = {
  INCREMENT_COUNTER: (state, action) => state + action.value
}

const locationHandler = {
  LOCATION_CHANGE: (state, action) => action.location
}

const initStates = { counter: 1, location: '/' }
const handlers = { counterHandler, locationHandler }

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    ...constructReducers(handlers, initStates),
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
