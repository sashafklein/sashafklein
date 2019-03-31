import { without } from 'lodash';

export const initialState = ['blink'];

export const openItems = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_OPEN_ITEM': {
      return state.includes(action.id)
        ? without(state, action.id)
        : state.concat(action.id);
    }
    default: {
      return state;
    }
  }
};

export default openItems;
