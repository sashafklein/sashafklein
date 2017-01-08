import React from 'react';

export const RoleSubtitle = ({ role }) => (
  <div className="role-subtitle">
    <span className="role-name">{ role.name } </span>
    <small>
      { role.location && <strong>({ role.location }) </strong> }
      { role.started && <span className='date'>{ role.started } </span> }
      { role.started && role.ended && <span className='date'>- { role.ended }</span> }
    </small>
  </div>
);

export default RoleSubtitle;
