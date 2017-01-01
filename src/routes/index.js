import _ from 'lodash';

import React from 'react';
import Home from './Home'
import Resume from './Resume'

if (window) {
  window._ = _;
}

export const createRoutes = (store) => ({
  path        : '/',
  indexRoute: { component: Home },
  childRoutes : [
    { path: 'resume', component: Resume },
  ]
})

export default createRoutes
