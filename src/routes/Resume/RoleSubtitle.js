import React from "react";
import PropTypes from "prop-types";

export const RoleSubtitle = ({ role }) => (
  <div className="role-subtitle">
    <span className="role-name">{role.name} </span>
    <small>
      <strong>
        ({[role.started, role.ended || "Present"].filter(d => d).join("-")}){" "}
      </strong>
      {role.location ? <>- {role.location} </> : null}
    </small>
  </div>
);

const { object } = PropTypes;
RoleSubtitle.propTypes = {
  role: object
};

export default RoleSubtitle;
