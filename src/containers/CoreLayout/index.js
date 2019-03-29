import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Meta from 'react-meta-tags';
import PropTypes from 'prop-types';

import { toggleSetting } from 'redux/actions';

import { professionalTitle } from 'routes/Resume';
import Header from 'components/Header';
import Tab from 'components/Tab';
import NavMenu from 'routes/Home';

export const CoreLayout = ({ dispatch, children, className, navOpen, location, tabOpen }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => dispatch(toggleSetting('navOpen', false)), 0);
    setTimeout(() => setLoaded(true), 0);
  }, () => {
    dispatch(toggleSetting('tabOpen', false));
  });

  const page = location.pathname.split('/')[1] || 'resume';

  const desc = {
    blog: 'Very occasional thoughts about coding, travel, and life.',
    projects: 'Saunas, web apps, and random junk.',
    resume: professionalTitle
  }[page];

  const title = `Sasha Klein - ${page[0].toUpperCase().concat(page.slice(1))}`;

  return (
    <div className={ className }>
      <Meta>
        <title>{ title }</title>
        <meta id="meta-description" name="description" content={ desc } />
        <meta id="og-title" property="og:title" content={ title } />
        <meta id="og-image" property="og:image" content="https://dl.dropboxusercontent.com/s/kbi6shbk5a5r54x/headshot2.jpg?dl=0" />
      </Meta>
      <Header />
      <div className="header-spacer" />
      <div className={ `core-layout ${loaded ? 'loaded' : 'loading'} ${tabOpen ? 'tab-open' : ''}` }>
        { children }
      </div>
      <NavMenu open={ navOpen } />
      <Tab />
    </div>
  );
};

const { element, string, func, bool, object } = PropTypes;
CoreLayout.propTypes = {
  children: element.isRequired,
  className: string,
  navOpen: bool,
  dispatch: func,
  location: object,
  tabOpen: bool
};

CoreLayout.defaultProps = {
  className: ''
};

export default connect(s => ({
  navOpen: s.settings.navOpen,
  location: s.router.location,
  tabOpen: s.settings.tabOpen
}))(CoreLayout);
