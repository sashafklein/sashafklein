import React from 'react';
import { connect } from 'react-redux';

import CoreLayout from 'containers/CoreLayout';
import PortfolioItem, { slug } from './PortfolioItem';
import PortfolioGrid from './PortfolioGrid';

export class Portfolio extends React.Component {
  render () {
    const { portfolioItems } = this.props;
    const specified = this.props.location.hash && this.props.location.hash.replace('#', '');

    const items = specified && specified.length && portfolioItems.find(i => slug(i.title) === specified)
      ? portfolioItems.filter(i => slug(i.title) === specified)
      : portfolioItems;

    return (
      <CoreLayout className="portfolio">
        {
          items.map((item, index) => (
            <PortfolioItem
              key={ index }
              item={ item }
            />
          ))
        }
        <PortfolioGrid />
      </CoreLayout>
    );
  }
};

const { array, object } = React.PropTypes;
Portfolio.propTypes = {
  portfolioItems: array,
  location: object
};

const mapStateToProps = state => ({
  portfolioItems: state.data.portfolioItems
});

export default connect(mapStateToProps)(Portfolio);
