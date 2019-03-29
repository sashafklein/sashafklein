import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import SlideMenu from 'components/SlideMenu';
import { slug } from './PortfolioItem';

export function PortfolioGrid ({ items }) {
  return (
    <SlideMenu className="portfolio-grid">
      <div className="portfolio-grid__inner">
        {
          items.map(item => (
            <Link key={ slug(item.title) } className="portfolio-grid__image-container" to={ `/projects#${slug(item.title)}` }>
              <div
                className="portfolio-grid__image"
                style={ { backgroundImage: `url(${item.image})` } }
              />
              <h1 className="portfolio-grid__title">{ item.title }</h1>
            </Link>
          ))
        }
      </div>
    </SlideMenu>
  );
}

const { array } = PropTypes;
PortfolioGrid.propTypes = {
  items: array
};

const mapStateToProps = state => ({
  items: state.data.portfolioItems
});

export default connect(mapStateToProps)(PortfolioGrid);
