import React from 'react';
import { connect } from 'react-redux';
import Markdown from 'components/Markdown';

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
    >
      <p
        className="collapse-title expandable-panel-title"
        onClick={ () => { dispatch(toggleSetting('openItemID', open ? null : item.id)) } }
      >
        <span className="icon">
          <i className="fa fa-plus-circle" />
        </span>
        <span className="item-title">{ item.title }</span>
        <small>
          <ItemSubtitle item={ item } />
        </small>
      </p>
      <div className="roles">
        {
          item.roles.map((role, index) => (
            <p key={ index } style={{ marginTop: '5px' }}>
              { manyRoles && <RoleSubtitle role={ role } /> }
              <div className={ `paragraph ${item.roles.length > 1 ? 'subrole' : ''}` }>
                <Markdown source={ role.description } />
              </div>
            </p>
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
