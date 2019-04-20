export const initialState = { tabOpen: false, flash: null, navOpen: false };

export const settings = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_SETTING": {
      return Object.assign({}, state, { [action.key]: action.value });
    }
    default: {
      return state;
    }
  }
};

export default settings;
