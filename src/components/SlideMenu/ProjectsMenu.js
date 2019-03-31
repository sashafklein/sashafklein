import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { slug } from 'routes/Portfolio/PortfolioItem';
import AnimatedLoader from 'components/AnimatedLoader';

export function PortfolioGrid ({ items, tabOpen }) {
  const [open, setOpen] = useState(tabOpen);

  useEffect(() => {
    setTimeout(() => {
      setOpen(tabOpen);
    }, 150);
  });

  return (
    <div className="portfolio-grid__inner">
      {
        open
          ? items.map((item, index) => (
            <AnimatedLoader className="portfolio-grid-loader fade-and-slide-up" waitMs={ index * 50 }>
              <Link key={ slug(item.title) } className="portfolio-grid__image-container" to={ `/projects#${slug(item.title)}` }>
                <div
                  className="portfolio-grid__image"
                  style={ { backgroundImage: `url(${item.image})` } }
                />
                <h1 className="portfolio-grid__title">{ item.title }</h1>
              </Link>
            </AnimatedLoader>
          ))
          : null
      }
    </div>
  );
}

const { array, bool } = PropTypes;
PortfolioGrid.propTypes = {
  items: array,
  tabOpen: bool
};

const mapStateToProps = state => ({
  items: state.data.portfolioItems,
  tabOpen: state.settings.tabOpen
});

export default connect(mapStateToProps)(PortfolioGrid);
