import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { toggleSetting } from 'store/actions';

const Tab = ({ open, version, dispatch }) => {
  if (!version) return null;

  const direction = open ? 'up' : 'down';
  const toggle = () => {
    if (location.pathname.includes('/projects') && open) {
      browserHistory.push('/projects');
    }
    dispatch(toggleSetting('tabOpen', !open));
  };

  return (
    <div className={ `menu-tab ${version} ${direction}` } onClick={ toggle }>
      <i className={ `fa fa-chevron-up` } />
    </div>
  );
}

const mapStateToProps = state => {
  const version = window.location.pathname.split('/')[1] || 'resume';

  return {
    open: state.settings.tabOpen,
    version
  };
};

export default connect(mapStateToProps)(Tab);
