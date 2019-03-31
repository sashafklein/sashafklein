import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'components/Markdown';
import Image from 'components/Image';

export const slug = title => title.toLowerCase().split(' ').join('-');

export const PortfolioItem = ({ item }) => (
  <div
    className="portfolio-item"
  >
    <div
      className="container content-section"
      id={ slug(item.title) }
    >
      <div className="black-links">
        <a target="_blank" href={ item.link } style={ { width: '100%' } }>
          <Image src={ item.image } className="port-photo content-section" alt={ item.title } style={ { width: '100%' } } />
        </a>
      </div>
      <div>
        <div className="port-header">
          <h1>{ item.title }</h1>
          <h2>{ item.subtitle }</h2>
        </div>
        <div className="markdown-container">
          {
            <Markdown source={ item.text } />
          }
        </div>
      </div>
    </div>
  </div>
);

const { object } = PropTypes;
PortfolioItem.propTypes = {
  item: object
};

export default PortfolioItem;
