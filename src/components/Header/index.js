import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router'

import Image from 'components/Image';
import Pig from './pig2.png'

import { toggleSetting } from 'store/actions';

export const Header = ({ flash, navOpen, dispatch }) => (
  <div>
    <div className="header-bar">
      <div className="container undecorated top-section">
        <div className="header-content">
          <div className="left-section">
            <div className="flex-link">
              <Link to="/resume" className="pig-link">
                <Image src={ Pig } />
                SASHA KLEIN
              </Link>
            </div>
          </div>
          <div className="right-section">
            <div className="flex-link">
              <a
                className={ 'fa fa-bars'.concat(navOpen ? ' open' : '') }
                onClick={
                  () => { dispatch(toggleSetting('navOpen', !navOpen)) }
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="header-spacer" />
    { flash &&
      <div className="alert center">
        <p>{ flash }</p>
      </div>
    }
  </div>
)

const mapStateToProps = state => ({
  flashes: state.settings.flash,
  navOpen: state.settings.navOpen
});

export default connect(mapStateToProps)(Header)
