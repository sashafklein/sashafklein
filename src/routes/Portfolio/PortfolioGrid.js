import React from 'react';
import { connect } from 'react-redux';

import SlideMenu from 'components/SlideMenu';

export function PortfolioGrid ({ items }) {
  return (
    <SlideMenu className="portfolio-grid">
      <div className="portfolio-grid__inner">
        {
          items.map((item, index) => (
            <div
              className="portfolio-grid__image"
              style={ { backgroundImage: item.image }}
            />
          ))
        }
      </div>
    </SlideMenu>
  );
}

const mapStateToProps = state => ({
  items: state.data.portfolioItems
});

export default connect(mapStateToProps)(PortfolioGrid);
