import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

const userLinks = null; // TODO

// - if current_user
//   <div className="flex-link full-link">
//     = safe_block_link_to wikis_path do
//       = fa_icon "file"
//   <div className="flex-link full-link">
//     = safe_block_link_to destroy_user_session_path, method: :delete do
//       = fa_icon "circle-o"

const MainHeader = () => (
  <div className="header-bar">
    <div className="container undecorated top-section">
      <div className="header-content">
        <div className="left-section">
          <div className="flex-link">
            <Link to="/resume" className="pig-link">
              <img src="pig3.png" />
              SASHA KLEIN
            </Link>
          </div>
        </div>
        <div className="right-section">
          <div className="flex-link hamburger">
            <img src="hamburger.png" />
          </div>
          <div className="flex-link full-link">
            <Link to="/portfolio">PORTFOLIO</Link>
          </div>
          <div className="flex-link full-link">
            <Link to="/posts">BLOG</Link>
          </div>
          { userLinks }
        </div>
      </div>
    </div>
  </div>
)

const flash = []; // TODO

export const Header = () => (
  <div>
    <MainHeader />
    <div className="header-spacer" />
    { flash.length &&
      <div className="alert center">
        <p}{ flash[0] }</p>
      </div>
    }
  </div>
)

export default Header
