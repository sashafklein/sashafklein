import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AnimatedLoader from 'components/AnimatedLoader';
import ProjectItem, { slug } from './ProjectItem';

export const Portfolio = ({ portfolioItems, location, navOpen, tabOpen }) => {
  const specified = location.hash && location.hash.replace('#', '');
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

  const items = (specified &&
    specified.length &&
    portfolioItems.find(i => slug(i.title) === specified)
  )
    ? portfolioItems.filter(i => slug(i.title) === specified)
    : portfolioItems;

  return (
    <div>
      {
        items.map(item => (
          <AnimatedLoader
            key={ slug(item.title) }
            className="fade-and-slide-up"
            hide={ !loaded }
          >
            <ProjectItem
              item={ item }
            />
          </AnimatedLoader>
        ))
      }
    </div>
  );
};

const { array, object, bool } = PropTypes;
Portfolio.propTypes = {
  portfolioItems: array,
  location: object,
  navOpen: bool,
  tabOpen: bool
};

const mapStateToProps = state => ({
  portfolioItems: state.data.portfolioItems,
  navOpen: state.settings.navOpen,
  tabOpen: state.settings.tabOpen
});

export default connect(mapStateToProps)(Portfolio);
