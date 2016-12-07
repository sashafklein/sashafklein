# Noon

This app is based off of [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit), which provides all the core technologies for our app, including:

- React
- Redux
- Webpack with Hot Loader
- Karma/Mocha for testing
- SCSS/PostCSS
- Eslint

### Getting started

To build locally:

```
npm install # or `yarn install` if using yarn
npm dev
```

To deploy to Heroku, simply commit the code and run:

```
git push heroku master
```

Which will deploy the code, compile it, and run the server.

To run tests or lint:

```
npm run test
npm run lint
```

For more information on the architectural thinking, check out the [starter kit repo](https://github.com/davezuko/react-redux-starter-kit) or read this [intro article](https://suspicious.website/2016/04/29/starting-out-with-react-redux-starter-kit/).

### Application Structure

```
.
├── bin                      # Build/Start scripts
├── config                   # Project and build configurations
├── public                   # Static public assets (not imported anywhere in source code)
├── server                   # Express application that provides webpack middleware
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── index.html           # Main HTML page container for app
│   ├── main.js              # Application bootstrap and rendering
│   ├── components           # Global Reusable Presentational Components
│   ├── containers           # Global Reusable Container Components
│   ├── layouts              # Components that dictate major page structure
│   │   └── CoreLayout.js    # CoreLayout which receives children for each route
│   │   └── CoreLayout.scss  # Styles related to the CoreLayout
│   │   └── index.js         # Main file for layout
│   ├── routes               # Main route definitions and async split points
│   │   ├── index.js         # Bootstrap main application routes with store
│   │   ├── Home             # Fractal route
│   │   │   ├── index.js     # Route definitions and async split points
│   │   │   ├── assets       # Assets required to render components
│   │   │   ├── components   # Presentational React Components
│   │   │   └── routes **    # Fractal sub-routes (** optional)
...
│   ├── store                # Redux-specific pieces
│   │   ├── createStore.js   # Create and instrument redux store
│   │   └── reducers.js      # Reducer registry and injection
│   └── styles               # Application-wide styles (generally settings)
└── tests                    # Unit tests
```

## Development

This app uses Redux DevTools out of the box, so install [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) if you want to use them.

Webpack is configured to make use of [resolve.root](http://webpack.github.io/docs/configuration.html#resolve-root), which lets you import local packages as if you were traversing from the root of your `~/src` directory. Here's an example:

```js
// current file: ~/src/views/some/nested/View.js
// What used to be this:
import SomeComponent from '../../../components/SomeComponent'

// Can now be this:
import SomeComponent from 'components/SomeComponent' // Hooray!
```

### Globals

These are global variables available to you anywhere in your source code. If you wish to modify them, they can be found as the `globals` key in `~/config/project.config.js`. When adding new globals, make sure you also add them to `~/.eslintrc`.

|Variable|Description|
|---|---|
|`process.env.NODE_ENV`|the active `NODE_ENV` when the build started|
|`__DEV__`|True when `process.env.NODE_ENV` is `development`|
|`__PROD__`|True when `process.env.NODE_ENV` is `production`|
|`__TEST__`|True when `process.env.NODE_ENV` is `test`|