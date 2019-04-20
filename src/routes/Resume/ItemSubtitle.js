import React from "react";
import PropTypes from "prop-types";

const dateString = item => {
  if (item.started) {
    return [item.started, item.ended].filter(d => d).join("-");
  } else {
    return [item.roles[0].started, item.roles[item.roles.length - 1].ended]
      .filter(d => d)
      .join("-");
  }
};

export const ItemSubtitle = ({ item }) => (
  <strong>
    ({dateString(item)}) -{" "}
    <em>{item.roleTitle || item.roles.map(r => r.name).join(", ")}</em>
  </strong>
);

const { object } = PropTypes;
ItemSubtitle.propTypes = {
  item: object
};

export default ItemSubtitle;
