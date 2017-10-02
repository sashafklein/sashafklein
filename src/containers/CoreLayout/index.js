import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { toggleSetting } from 'store/actions';

import Header from 'components/Header';
import Tab from 'components/Tab';
import NavMenu from 'routes/Home';

export class CoreLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.dispatch(toggleSetting('navOpen', false));
    }, 0);
  }

  componentWillReceiveProps (newProps) {
    if (newProps.location !== this.props.location) {
      this.props.dispatch(toggleSetting('tabOpen', false));
    }
  }

  componentWillUnmount () {
    this.props.dispatch(toggleSetting('tabOpen', false));
  }

  render() {
    const { children, className, navOpen, dispatch } = this.props;

    return(
      <div className={ className  }>
        <Header />
        <div className={ `core-layout` }>
          { children }
        </div>
        <NavMenu open={ navOpen } />
        <Tab />
      </div>
    );
  }
};

const { element, string } = React.PropTypes;
CoreLayout.propTypes = {
  children: element.isRequired,
  className: string
};

CoreLayout.defaultProps = {
  className: ''
};

export default connect(s => ({ navOpen: s.settings.navOpen }))(CoreLayout);
