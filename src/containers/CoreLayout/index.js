import React from 'react';

import Header from 'components/Header';

export class CoreLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }, 300);
  }

  componentWillUnmount() {
    this.setState({ show: false });
  }

  render() {
    const { children, className } = this.props;
    const { show } = this.state;

    return(
      <div className={ className  }>
        <Header />
        <div className={ `core-layout ${ show ? '' : 'hidden' }` }>
          { children }
        </div>
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

export default CoreLayout;
