import { constructReducers, curryMakeRootReducer, curryInjectReducer } from './boilerplate'
import work from './data/work';
import education from './data/education';
import skills from './data/skills';
import portfolioItems from './data/portfolioItems';
import posts from './data/posts';

const file = require('raw!./data/encryptedNotebook.txt');

// HANDLERS
// Handlers map actions to reducing functions.
// Init and default states are added by constructReducers function.
const data = {
  _init: { work, education, skills, portfolioItems, posts },
}

const location = {
  _init: '/',
  LOCATION_CHANGE: (state, action) => action.location
}

const settings = {
  _init: { openItemID: 'redshift', skillsTabOpen: false, flash: null, navOpen: false },
  TOGGLE_SETTING: (state, action) => Object.assign({}, state, { [action.key]: action.value })
}

const notes = {
  _init: file
};

const decryptor = {
  _init: (window && window.localStorage && window.localStorage.decryptor) || '',
  SET_DECRYPTOR: (state, action) => {
    window.localStorage.decryptor = action.decryptor;
    return action.decryptor
  }
};

// DEFINE INIT STATES AND HANDLERS OBJ HERE
const handlers = { data, location, settings, notes, decryptor };

// EXPORTS
export const makeRootReducer = curryMakeRootReducer(constructReducers(handlers))
export const injectReducer = curryInjectReducer(makeRootReducer)

export default makeRootReducer
