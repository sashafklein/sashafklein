import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ItemSubtitle from "./ItemSubtitle";

export const ItemWithLink = ({ item }) => (
  <li className="collapse-title top-level resume-link" key={item.id}>
    <Link to={item.link}>
      <span className="item-title">{item.title}</span>
      <small>
        <ItemSubtitle item={item} />
      </small>
    </Link>
  </li>
);

const { object } = PropTypes;
ItemWithLink.propTypes = {
  item: object
};

export default ItemWithLink;
