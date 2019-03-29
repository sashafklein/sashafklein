import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CoreLayout from 'containers/CoreLayout';
import PortfolioItem, { slug } from './PortfolioItem';
import PortfolioGrid from './PortfolioGrid';

export const Portfolio = ({ portfolioItems, location }) => {
  const specified = location.hash && location.hash.replace('#', '');

  const items = (specified &&
    specified.length &&
    portfolioItems.find(i => slug(i.title) === specified)
  )
    ? portfolioItems.filter(i => slug(i.title) === specified)
    : portfolioItems;

  return (
    <CoreLayout className="page-container portfolio">
      {
        items.map(item => (
          <PortfolioItem
            key={ slug(item.title) }
            item={ item }
          />
        ))
      }
      <PortfolioGrid />
    </CoreLayout>
  );
};

const { array, object } = PropTypes;
Portfolio.propTypes = {
  portfolioItems: array,
  location: object
};

const mapStateToProps = state => ({
  portfolioItems: state.data.portfolioItems
});

export default connect(mapStateToProps)(Portfolio);
