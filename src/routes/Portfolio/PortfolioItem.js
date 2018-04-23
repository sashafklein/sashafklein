import React from 'react';
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
      <div className="sidebar black-links">
        <div className="show-medium">
          { item.bullets &&
            <ul className="port-list hide-medium">
              {
                item.bullets.map((bullet, bulletIndex) => (
                  <li key={ bulletIndex }>{ bullet }</li>
                ))
              }
            </ul>
          }
        </div>
      </div>
      <div className="black-links" style={ { width: '100%' } }>
        <a href={ item.link } style={ { width: '100%' } }>
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

const { object } = React.PropTypes;
PortfolioItem.propTypes = {
  item: object
};

export default PortfolioItem;
