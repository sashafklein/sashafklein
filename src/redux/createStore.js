import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import ReactGA from 'react-ga';

import createRootReducer from './reducers';
import { toggleSetting } from './actions';

ReactGA.initialize('UA-117151476-1');

export const history = createBrowserHistory();

const locationMiddleware = store => next => (action) => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const route = action.payload;
    const nextPage = `${route.location.pathname}${route.location.search}`;

    if (window.location.href.includes('sashafklein.com')) {
      ReactGA.pageview(nextPage);
    } else {
      console.log('Tracked', nextPage);
    }
    store.dispatch(toggleSetting('tabOpen', false));
  }

  return next(action);
};

const middleware = [
  routerMiddleware(history),
  thunk,
  locationMiddleware
];

/* eslint-disable-next-line */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
);

const configureStore = (initialState) => {
  const store = createStore(
    createRootReducer(history),
    initialState,
    enhancer
  );

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    /* eslint-disable implicit-arrow-linebreak, global-require */
    module.hot.accept(
      './reducers',
      () => store.replaceReducer(require('./reducers'))
    );
  }

  return store;
};

export default configureStore({});
