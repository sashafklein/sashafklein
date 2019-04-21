import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import AnimatedLoader from "components/AnimatedLoader";
import ProjectItem, { slug } from "./ProjectItem";

export const Portfolio = ({ projects, location, navOpen, tabOpen }) => {
  const specified = location.hash && location.hash.replace("#", "");
  const [loaded, setLoaded] = useState(navOpen || tabOpen);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!navOpen && !tabOpen) {
      setTimeout(() => {
        setLoaded(true);
      }, 200);
    } else {
      setLoaded(false);
    }
  });

  const items =
    specified &&
    specified.length &&
    projects.find(i => slug(i.title) === specified)
      ? projects.filter(i => slug(i.title) === specified)
      : projects;

  return (
    <div>
      {items.map(item => (
        <AnimatedLoader
          key={slug(item.title)}
          className="fade-and-slide-up"
          hide={!loaded}
        >
          <ProjectItem item={item} />
        </AnimatedLoader>
      ))}
    </div>
  );
};

const { array, object, bool } = PropTypes;
Portfolio.propTypes = {
  projects: array,
  location: object,
  navOpen: bool,
  tabOpen: bool
};

const mapStateToProps = state => ({
  projects: state.data.projects,
  navOpen: state.settings.navOpen,
  tabOpen: state.settings.tabOpen
});

export default connect(mapStateToProps)(Portfolio);
