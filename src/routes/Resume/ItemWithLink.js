import React from 'react';
import { Link } from 'react-router';
import ItemSubtitle from './ItemSubtitle';

export const ItemWithLink = ({ item }) => (
  <div className="collapse-title top-level" key={ item.id }>
    <Link to={ item.link }>
      <span className="icon">
        <i className="fa fa-arrow-right" />
      </span>
      <span className="item-title">
        { item.title }
      </span>
      <small>
        <ItemSubtitle item={ item } />
      </small>
    </Link>
  </div>
);

export default ItemWithLink;