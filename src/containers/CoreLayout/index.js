import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Meta from "react-meta-tags";
import PropTypes from "prop-types";

import { toggleSetting } from "redux/actions";

import { professionalTitle } from "routes/Resume";
import Header from "components/Header";
import Tab from "components/Tab";
import Nav from "components/Nav";
import SlideMenu from "components/SlideMenu";

export const CoreLayout = ({ dispatch, children, page, tabOpen }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(
    () => {
      setTimeout(() => dispatch(toggleSetting("navOpen", false)), 0);
      setTimeout(() => setLoaded(true), 0);
    },
    () => {
      dispatch(toggleSetting("tabOpen", false));
    }
  );

  const desc = {
    blog: "Very occasional thoughts about coding, travel, and life.",
    projects: "Saunas, web apps, and random junk.",
    resume: professionalTitle
  }[page];

  const title = `Sasha Klein - ${page[0].toUpperCase().concat(page.slice(1))}`;
  const image =
    "https://sasha-public-assets.s3-us-west-1.amazonaws.com/sashafklein/og-image.jpg";

  return (
    <div className={`page-container ${page}`}>
      <Meta>
        <title>{title}</title>
        <meta id="meta-description" name="description" content={desc} />
        <meta id="og-title" property="og:title" content={title} />
        <meta id="og-image" property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@sashafklein" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={image} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:type" content="website" />
        <meta property="og:image:alt" content={title} />
        <meta property="og:image:secure_url" content={image} />
      </Meta>
      <Header />
      <div className="header-spacer" />
      <div
        className={`core-layout ${loaded ? "loaded" : "loading"} ${
          tabOpen ? "tab-open" : ""
        }`}
      >
        {children}
      </div>
      <SlideMenu pageName={page} />
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
