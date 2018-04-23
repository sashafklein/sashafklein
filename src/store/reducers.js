import { without } from 'lodash';
import { constructReducers, curryMakeRootReducer, curryInjectReducer } from './boilerplate';
import work from './data/work';
import education from './data/education';
import skills from './data/skills';
import portfolioItems from './data/portfolioItems';
import posts from './data/posts';

// HANDLERS
// Handlers map actions to reducing functions.
// Init and default states are added by constructReducers function.
const data = {
  _init: { work, education, skills, portfolioItems, posts },
};

const location = {
  _init: '/',
  LOCATION_CHANGE: (state, action) => action.location
};

const settings = {
  _init: { tabOpen: false, flash: null, navOpen: false },
  TOGGLE_SETTING: (state, action) => Object.assign({}, state, { [action.key]: action.value })
};

const openItems = {
  _init: ['redshift'],
  TOGGLE_OPEN_ITEM: (state, action) => state.includes(action.id)
    ? without(state, action.id)
    : state.concat(action.id)
};

// DEFINE INIT STATES AND HANDLERS OBJ HERE
const handlers = { data, location, settings, openItems };

// EXPORTS
export const makeRootReducer = curryMakeRootReducer(constructReducers(handlers));
export const injectReducer = curryInjectReducer(makeRootReducer);

export default makeRootReducer;
