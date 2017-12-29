import React from 'react';
import { connect } from 'react-redux';

import CoreLayout from 'containers/CoreLayout'
import PortfolioItem from './PortfolioItem';
import PortfolioGrid from './PortfolioGrid';

export const Portfolio = ({ portfolioItems }) => {

  return (
    <CoreLayout className="portfolio">
      {
        portfolioItems.map((item, index) => (
          <PortfolioItem
            key={ index }
            item={ item }
            nextItem={ portfolioItems[index + 1] }
          />
        ))
      }
      <PortfolioGrid />
    </CoreLayout>
  );
};

const { array } = React.PropTypes;
Portfolio.propTypes = {
  portfolioItems: array
};

const mapStateToProps = state => ({
  portfolioItems: state.data.portfolioItems
});

export default connect(mapStateToProps)(Portfolio);