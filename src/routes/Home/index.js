import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { toggleSetting } from 'store/actions';

import 'styles/core.scss';

const paths = ['Resume', 'Projects', 'Blog'];
const component = (path, location, dispatch) => {
  const isActive = location.pathname.includes(path.toLowerCase())
    || (location.pathname === '/' && path === 'Resume');

  const props = {
    style: { textDecoration: 'none' },
    className: `landing-button${ isActive ? ' active' : ''}`,
    key: path
  };

  const content = <div className="inner-text">
    <a style={{ textDecoration: 'none' }}>{ path.toUpperCase() }</a>
  </div>


  if (isActive) {
    return <a { ...props } onClick={ () => {
      if (location.pathname.includes('/projects') && open) {
        browserHistory.push('/projects');
      }
      dispatch(toggleSetting('navOpen', false));
    } }>
      { content }
    </a>
  } else {
    return <Link { ...props} to={ `/${path.toLowerCase()}`}>
      { content }
    </Link>
  }
}

export const Home = ({ open, dispatch }) => (
  <div className={ 'landing'.concat(open && !location.pathname.includes('notes') ? ' open' : '') }>
    <div className="landing-buttons">
      {
        paths.map((path) => (
          component(path, location, dispatch)
        ))
      }
    </div>
  </div>
);

Home.defaultProps = {
  open: true
};

export default connect()(Home);
