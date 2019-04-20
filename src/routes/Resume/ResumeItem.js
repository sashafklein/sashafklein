import React from "react";
import PropTypes from "prop-types";
import ItemWithoutLink from "./ItemWithoutLink";
import ItemWithLink from "./ItemWithLink";

export const ResumeItem = ({ item }) => (
  <ul>
    {item.link ? <ItemWithLink item={item} /> : <ItemWithoutLink item={item} />}
  </ul>
);

const { object } = PropTypes;
ResumeItem.propTypes = {
  item: object
};

export default ResumeItem;
