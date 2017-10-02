import React from 'react';
import { connect } from 'react-redux';

import { toggleSetting } from 'store/actions';

const Tab = ({ open, version, dispatch }) => {
  if (!version) return null;

  const direction = open ? 'up' : 'down';
  const toggle = () => { dispatch(toggleSetting('tabOpen', !open)) };

  return (
    <div className={ `menu-tab ${version} ${direction}` } onClick={ toggle }>
      <i className={ `fa fa-chevron-down` } />
    </div>
  );
}

const mapStateToProps = state => {
  if (window.location.pathname.includes('/projects')) return null;

  const version = window.location.pathname.includes('/blog')
    ? 'blog'
    : 'resume';

  return {
    open: state.settings.tabOpen,
    version
  };
};

export default connect(mapStateToProps)(Tab);
