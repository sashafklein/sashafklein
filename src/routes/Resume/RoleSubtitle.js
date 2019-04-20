import React from "react";
import PropTypes from "prop-types";

export const RoleSubtitle = ({ role }) => (
  <div className="role-subtitle">
    <span className="role-name">{role.name} </span>
    <small>
      {role.location && <strong>({role.location}) </strong>}
      {role.started && <span className="date">{role.started} </span>}
      {role.started && <span className="date">-{role.ended || "Present"}</span>}
    </small>
  </div>
);

const { object } = PropTypes;
RoleSubtitle.propTypes = {
  role: object
};

export default RoleSubtitle;
