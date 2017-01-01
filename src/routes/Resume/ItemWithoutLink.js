import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import { toggleSetting } from 'store/actions';

import ItemSubtitle from './ItemSubtitle';
import RoleSubtitle from './RoleSubtitle';

const ItemWithoutLink = ({ item, dispatch, openItemID }) => {
  const manyRoles = item.roles.length > 1;
  const open = openItemID === item.id;

  return (
    <div
      key={ item.id }
      className={ `panel ${ open ? '' : 'closed' }` }
      onClick={ () => { dispatch(toggleSetting('openItemID', open ? null : item.id)) }
    }>
      <span className="collapse-title expandable-panel-title">
        <span className="icon">
          <i className="fa fa-plus-circle" />
        </span>
        <span className="item-title">{ item.title }</span>
        <small>
          <ItemSubtitle item={ item } />
        </small>
      </span>
      <div className="roles">
        {
          item.roles.map((role, index) => (
            <div key={ index }>
              { manyRoles && <RoleSubtitle role={ role } /> }
              <div className={ `paragraph ${item.roles.length > 1 ? 'subrole' : ''}` }>
                <ReactMarkdown source={ role.description } />
              </div>
              { index === item.roles.length - 1 ? null : <br /> }
            </div>
          ))
        }
      </div>
    </div>
  );
};

const { func, object, string } = React.PropTypes;
ItemWithoutLink.propTypes = {
  item: object,
  dispatch: func,
  openItemID: string
}

const mapStateToProps = state => ({
  openItemID: state.settings.openItemID
});

export default connect(mapStateToProps)(ItemWithoutLink);
