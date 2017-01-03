import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router'

import Pig from './pig.png'

const userLinks = null; // TODO

// - if current_user
//   <div className="flex-link full-link">
//     = safe_block_link_to wikis_path do
//       = fa_icon "file"
//   <div className="flex-link full-link">
//     = safe_block_link_to destroy_user_session_path, method: :delete do
//       = fa_icon "circle-o"

const links = ['resume', 'portfolio', 'blog']

export const Header = ({ flash }) => (
  <div>
    <div className="header-bar">
      <div className="container undecorated top-section">
        <div className="header-content">
          <div className="left-section">
            <div className="flex-link">
              <Link to="/resume" className="pig-link">
                <img src={ Pig } />
                SASHA KLEIN
              </Link>
            </div>
          </div>
          <div className="right-section">
            <div className="flex-link hamburger">
              <img src="hamburger.png" />
            </div>
            {
              links.filter(l => (
                location.pathname
                  ? !location.pathname.includes(l)
                  : l !== 'resume'
              )).map((l, i) => (
                <div key={ i } className="flex-link full-link">
                  <Link to={ `/${l}` }>{ l.toUpperCase() }</Link>
                </div>
              ))
            }
            { userLinks }
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
  flashes: state.settings.flash
});

export default connect(mapStateToProps)(Header)
