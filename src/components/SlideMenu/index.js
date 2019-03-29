import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const SlideMenu = ({ open, className, children }) => (
  <div className={ `slide-menu ${open ? 'open' : ''} ${className}` }>
    { children }
  </div>
);

const mapStateToProps = state => ({
  open: state.settings.tabOpen
});

const { bool, string, node } = PropTypes;
SlideMenu.propTypes = {
  open: bool,
  className: string,
  children: node
};

export default connect(mapStateToProps)(SlideMenu);
