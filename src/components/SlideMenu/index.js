import React from 'react';
import { connect } from 'react-redux';

export class SlideMenu extends React.Component {
  constructor (props) {
    super(props);
    this.state = { query: '', searching: false };
  }

  render () {
    const { open, className, children } = this.props;

    return (
      <div className={ `slide-menu ${open ? 'open' : ''} ${className}` }>
        { children }
      </div>
    );
  };
}

const mapStateToProps = state => ({
  open: state.settings.tabOpen
});

const { bool, string, node } = React.PropTypes;
SlideMenu.propTypes = {
  open: bool,
  className: string,
  children: node
};

export default connect(mapStateToProps)(SlideMenu);
