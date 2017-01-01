import { constructReducers, curryMakeRootReducer, curryInjectReducer } from './boilerplate'
import work from './data/work';
import education from './data/education';
import skills from './data/skills';

// HANDLERS
// Handlers map actions to reducing functions.
// Init and default states are added by constructReducers function.
const data = {
  _init: { work, education, skills },
}

const location = {
  _init: '/',
  LOCATION_CHANGE: (state, action) => action.location
}

const settings = {
  _init: { openItemID: 'redshift', skillsTabOpen: false, flash: null },
  TOGGLE_SETTING: (state, action) => Object.assign({}, state, { [action.key]: action.value })
}

// DEFINE INIT STATES AND HANDLERS OBJ HERE
const handlers = { data, location, settings }

// EXPORTS
export const makeRootReducer = curryMakeRootReducer(constructReducers(handlers))
export const injectReducer = curryInjectReducer(makeRootReducer)

export default makeRootReducer
