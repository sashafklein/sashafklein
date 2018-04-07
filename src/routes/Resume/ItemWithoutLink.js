import React from 'react';
import { connect } from 'react-redux';
import Markdown from 'components/Markdown';

import { toggleOpenItem } from 'store/actions';

import ItemSubtitle from './ItemSubtitle';
import RoleSubtitle from './RoleSubtitle';

const ItemWithoutLink = ({ item, dispatch, openItems }) => {
  const manyRoles = item.roles.length > 1;
  const open = openItems.includes(item.id);

  return (
    <li
      key={ item.id }
      className={ `panel ${ open ? '' : 'closed' }` }
      onClick={ (el) => {
        if (el.target.className.split(' ').indexOf('panel') !== -1) {
          dispatch(toggleOpenItem(item.id))
        }
      } }
    >
      <p
        className="collapse-title expandable-panel-title"
        onClick={ () => {
          dispatch(toggleOpenItem(item.id))
        } }
      >
        <span className="item-title">{ item.title }</span>
        <small>
          <ItemSubtitle item={ item } />
        </small>
      </p>
      <div className="roles">
        {
          item.roles.map((role, index) => (
            <div className="subsection" key={ index } style={{ marginTop: '5px' }}>
              { manyRoles && <RoleSubtitle role={ role } /> }
              <div className={ `paragraph ${item.roles.length > 1 ? 'subrole' : ''}` }>
                <Markdown source={ role.description } />
              </div>
            </div>
          ))
        }
      </div>
    </li>
  );
};

const { func, object, array } = React.PropTypes;
ItemWithoutLink.propTypes = {
  item: object,
  dispatch: func,
  openItems: array
}

const mapStateToProps = state => ({
  openItems: state.openItems
});

export default connect(mapStateToProps)(ItemWithoutLink);
