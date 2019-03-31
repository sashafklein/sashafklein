import React from 'react';
import _ from 'lodash';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { object } from 'prop-types';

import AppContainer from 'containers/AppContainer';
import CoreLayout from 'containers/CoreLayout';

import Resume from './Resume';
import Projects from './Projects';
import Blog from './Blog';
import BlogLanding from './Blog/BlogLanding';

if (window) {
  window._ = _;
}

/**
 * App routes.
 * Path is path match.
 * Additional fields can be added
 */
export const routes = [
  { path: '/', component: Resume },
  { path: '/projects', component: Projects },
  { path: '/resume', component: Resume },
  { path: '/blog', component: BlogLanding },
  { path: '/blog/:postSlug', component: Blog }
];

/**
 * Defines the base routes of the application.
 */
const Routes = ({ router }) => {
  const { location } = router;
  const page = location.pathname.split('/')[1] || 'resume';

  return (
    <AppContainer>
      <CoreLayout page={ page }>
        <Switch location={ location }>
          {
            routes.map(route => (
              <Route
                { ..._.pick(route, 'path', 'component', 'onEnter') }
                key={ route.path }
                exact={ true }
              />
            ))
          }
        </Switch>
      </CoreLayout>
    </AppContainer>
  );
};

const mapStateToProps = state => ({
  router: state.router
});

Routes.propTypes = {
  router: object
};

export default connect(mapStateToProps)(Routes);
