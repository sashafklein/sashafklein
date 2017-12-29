import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { toggleSetting } from 'store/actions';
import CoreLayout from 'containers/CoreLayout';

export class SlideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '', searching: false }
  }

  render() {
    const { posts, open, dispatch, className, children } = this.props;
    const { searching, query } = this.state;

    return(
      <div className={ `slide-menu ${open ? 'open' : ''} ${className }` }>
        { children }
      </div>
    )
  };
}

const mapStateToProps = state => ({
  open: state.settings.tabOpen
});

export default connect(mapStateToProps)(SlideMenu);
