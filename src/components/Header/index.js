import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Image from 'components/Image';
import { toggleSetting } from 'redux/actions';
import Pig from './pig.png';

export const Header = ({ navOpen, dispatch }) => (
  <div className="header-bar">
    <div className="container undecorated top-section">
      <div className="header-content">
        <div className="left-section">
          <div className="flex-link">
            <Link to="/resume" className="pig-link">
              <Image src={ Pig } alt="pig" />
              Sasha Klein
            </Link>
          </div>
        </div>
        <div className="right-section">
          <div className="flex-link">
            <a
              className={ 'fa fa-bars'.concat(navOpen ? ' open' : '') }
              onClick={
                () => { dispatch(toggleSetting('navOpen', !navOpen)); }
              }
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  navOpen: state.settings.navOpen
});

const { bool, func } = PropTypes;
Header.propTypes = {
  navOpen: bool,
  dispatch: func
};

export default connect(mapStateToProps)(Header);
