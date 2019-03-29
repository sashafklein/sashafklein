import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleSetting } from 'redux/actions';

import 'styles/core.scss';

const paths = ['Resume', 'Projects', 'Blog'];

export const Home = ({ open, dispatch, pathname, history }) => {
  const component = (path) => {
    const isActive = pathname.includes(path.toLowerCase()) ||
      (pathname === '/' && path === 'Resume');

    const props = {
      style: { textDecoration: 'none' },
      className: `landing-button${isActive ? ' active' : ''}`,
      key: path
    };

    const content = (
      <div className="inner-text">
        <a style={ { textDecoration: 'none' } }>
          { path.toUpperCase() }
        </a>
      </div>
    );

    if (isActive) {
      return (
        <a
          { ...props }
          onClick={ () => {
            if (pathname.includes('/projects') && open) {
              history.push('/projects');
            }
            dispatch(toggleSetting('navOpen', false));
          } }
        >
          { content }
        </a>
      );
    } else {
      return (
        <Link { ...props } to={ `/${path.toLowerCase()}` }>
          { content }
        </Link>
      );
    }
  };

  return (
    <div className={ 'landing'.concat(open && !pathname.includes('notes') ? ' open' : '') }>
      <div className="landing-buttons">
        {
          paths.map(path => (
            component(path)
          ))
        }
      </div>
    </div>
  );
};

const { bool, func, string, object } = PropTypes;
Home.propTypes = {
  open: bool,
  dispatch: func,
  pathname: string,
  history: object
};

Home.defaultProps = {
  open: true
};

export default connect(s => ({ history: s.history, pathname: s.router.location.pathname }))(Home);
