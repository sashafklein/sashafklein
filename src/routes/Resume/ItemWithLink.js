import React from 'react';
import { Link } from 'react-router';
import ItemSubtitle from './ItemSubtitle';

export const ItemWithLink = ({ item }) => (
  <li className="collapse-title top-level resume-link" key={ item.id }>
    <Link to={ item.link }>
      <span className="item-title">
        { item.title }
      </span>
      <small>
        <ItemSubtitle item={ item } />
      </small>
    </Link>
  </li>
);

const { object } = React.PropTypes;
ItemWithLink.propTypes = {
  item: object
};

export default ItemWithLink;
