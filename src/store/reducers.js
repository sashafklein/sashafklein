import { constructReducers, curryMakeRootReducer, curryInjectReducer } from './boilerplate'

// HANDLERS
// Handlers map actions to reducing functions.
// Init and default states are added by constructReducers function.
const counter = {
  INCREMENT_COUNTER: (state, action) => state + action.value,
  DECREMENT_COUNTER: (state, action) => state - action.value
}

const location = {
  LOCATION_CHANGE: (state, action) => action.location
}

// DEFINE INIT STATES AND HANDLERS OBJ HERE
const initStates = { counter: 1, location: '/' }
const handlers = { counter, location }

// EXPORTS
export const makeRootReducer = curryMakeRootReducer(constructReducers(handlers, initStates))
export const injectReducer = curryInjectReducer(makeRootReducer)

export default makeRootReducer
