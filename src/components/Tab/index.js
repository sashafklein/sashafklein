import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleSetting } from 'redux/actions';

const Tab = ({ open, version, dispatch, history, router }) => {
  if (!version) return null;

  const direction = open ? 'up' : 'down';
  const toggle = () => {
    if (router.location.pathname.includes('/projects') && open) {
      history.push('/projects');
    }
    dispatch(toggleSetting('tabOpen', !open));
  };

  return (
    <div
      className={ `menu-tab ${version} ${direction}` }
      onClick={ toggle }
    >
      <i className="fa fa-chevron-up" />
    </div>
  );
};

const mapStateToProps = (state) => {
  const version = window.location.pathname.split('/')[1] || 'resume';

  return {
    open: state.settings.tabOpen,
    version,
    router: state.router,
    history: state.history
  };
};

const { bool, string, func, shape } = PropTypes;
Tab.propTypes = {
  open: bool,
  version: string,
  dispatch: func,
  history: shape({ push: func }),
  router: shape({ location: shape({ pathname: string }) })
};

export default connect(mapStateToProps)(Tab);
