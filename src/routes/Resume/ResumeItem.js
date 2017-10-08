import React from 'react';
import ItemWithoutLink from './ItemWithoutLink';
import ItemWithLink from './ItemWithLink';

export const ResumeItem = ({ item }) => (
  <ul>
    {
      item.link
        ? <ItemWithLink item={ item } />
        : <ItemWithoutLink item={ item } />
    }
  </ul>
);

const { object } = React.PropTypes;
ResumeItem.propTypes = {
  item: object
};

export default ResumeItem;
