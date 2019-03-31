import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';

import { toggleSetting } from 'redux/actions';
import AnimatedLoader from 'components/AnimatedLoader';

import './Nav.scss';

const paths = ['Resume', 'Projects', 'Blog'];

export const Nav = ({ navOpen, dispatch, pathname }) => {
  const [itemShowing, showItem] = useState(false);
  const [navShowing, showNav] = useState(false);

  useEffect(() => {
    if (navOpen) {
      showItem(true);
      showNav(true);
    } else {
      showItem(false);
      setTimeout(() => {
        showNav(false);
      }, 300);
    }
  });

  const component = (path) => {
    const isActive = pathname.includes(path.toLowerCase()) ||
      (pathname === '/' && path === 'Resume');

    const props = {
      style: { textDecoration: 'none' },
      className: `nav-button ${isActive ? 'active' : ''}`,
      key: path,
      onClick: () => {
        dispatch(push(`/${path.toLowerCase()}`));
        dispatch(toggleSetting('navOpen', false));
      }
    };

    const content = (
      <div className="inner-text">
        <span style={ { textDecoration: 'none' } }>
          { path }
        </span>
      </div>
    );

    return (<a { ...props }>{ content }</a>);
  };

  return (
    <div className={ `nav ${navShowing ? 'open' : ''}` }>
      <div className="nav-buttons">
        {
          paths.map((path, index) => (
            <AnimatedLoader
              className="nav-button-loader fade-and-slide-up testing"
              hide={ !itemShowing }
              waitMs={ 200 + index * 100 }
              key={ path }
            >
              { component(path) }
            </AnimatedLoader>
          ))
        }
      </div>
    </div>
  );
};

const { bool, func, string } = PropTypes;
Nav.propTypes = {
  navOpen: bool,
  dispatch: func,
  pathname: string
};

export default connect(s => ({
  history: s.history,
  pathname: s.router.location.pathname,
  navOpen: s.settings.navOpen
}))(Nav);
