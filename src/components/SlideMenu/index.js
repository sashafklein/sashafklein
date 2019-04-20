import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ResumeMenu from "./ResumeMenu";
import ProjectsMenu from "./ProjectsMenu";
import BlogMenu from "./BlogMenu";

const menus = {
  resume: ResumeMenu,
  projects: ProjectsMenu,
  blog: BlogMenu
};

export const SlideMenu = ({ open, pageName }) => {
  const Menu = menus[pageName];

  if (!Menu) {
    return null;
  }

  return (
    <div className={`slide-menu ${open ? "open" : ""} ${pageName}-menu`}>
      <Menu />
    </div>
  );
};

const mapStateToProps = state => ({
  open: state.settings.tabOpen
});

const { bool, string } = PropTypes;
SlideMenu.propTypes = {
  open: bool,
  pageName: string
};

export default connect(mapStateToProps)(SlideMenu);
