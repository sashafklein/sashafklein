import React from 'react';
import { connect } from 'react-redux';

import CoreLayout from 'containers/CoreLayout'
import PortfolioItem, { slug } from './PortfolioItem';
import PortfolioGrid from './PortfolioGrid';

export class Portfolio extends React.Component {
  componentWillMount() {

  }

  componentDidMount () {
    setTimeout(() => {
      this.jumpToSpecified();
    }, 800)
  }

  componentWillReceiveProps() {
    this.jumpToSpecified();
  }

  jumpToSpecified() {
    const { portfolioItems } = this.props;

    if (location.hash) {
      const id = location.hash.replace('#', '');
      const item = portfolioItems.find(i => slug(i.title) === id);

      if (item) {
        const element = document.getElementById(id);

        element.parentElement.scrollIntoView();
      }
    }
  }

  render() {
    const { portfolioItems } = this.props;

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
  }
};

const { array } = React.PropTypes;
Portfolio.propTypes = {
  portfolioItems: array
};

const mapStateToProps = state => ({
  portfolioItems: state.data.portfolioItems
});

export default connect(mapStateToProps)(Portfolio);