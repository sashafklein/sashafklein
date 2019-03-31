import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Meta from 'react-meta-tags';
import PropTypes from 'prop-types';

import { toggleSetting } from 'redux/actions';

import Headshot from 'assets/img/headshot.jpg';
import { professionalTitle } from 'routes/Resume';
import Header from 'components/Header';
import Tab from 'components/Tab';
import Nav from 'components/Nav';
import SlideMenu from 'components/SlideMenu';

export const CoreLayout = ({ dispatch, children, page, tabOpen }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => dispatch(toggleSetting('navOpen', false)), 0);
    setTimeout(() => setLoaded(true), 0);
  }, () => {
    dispatch(toggleSetting('tabOpen', false));
  });

  const desc = {
    blog: 'Very occasional thoughts about coding, travel, and life.',
    projects: 'Saunas, web apps, and random junk.',
    resume: professionalTitle
  }[page];

  const title = `Sasha Klein - ${page[0].toUpperCase().concat(page.slice(1))}`;

  return (
    <div className={ `page-container ${page}` }>
      <Meta>
        <title>{ title }</title>
        <meta id="meta-description" name="description" content={ desc } />
        <meta id="og-title" property="og:title" content={ title } />
        <meta id="og-image" property="og:image" content={ Headshot } />
      </Meta>
      <Header />
      <div className="header-spacer" />
      <div className={ `core-layout ${loaded ? 'loaded' : 'loading'} ${tabOpen ? 'tab-open' : ''}` }>
        { children }
      </div>
      <SlideMenu pageName={ page } />
      <Nav />
      <Tab />
    </div>
  );
};

const { element, string, func, bool, arrayOf, oneOfType } = PropTypes;
CoreLayout.propTypes = {
  children: oneOfType([arrayOf(element.isRequired), element]),
  page: string,
  dispatch: func,
  tabOpen: bool
};

export default connect(s => ({
  navOpen: s.settings.navOpen,
  location: s.router.location,
  tabOpen: s.settings.tabOpen
}))(CoreLayout);
