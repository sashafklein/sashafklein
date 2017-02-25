import React from 'react';

import './Image.scss';

export class Image extends React.Component {
  constructor (props) {
    super(props);
    this.state = { loaded: false };
  }

  render () {
    const { className, show, src, loadedClass, ...props } = this.props;
    const { loaded } = this.state;

    let classes = 'image';
    if (loaded && show) {
      classes += ' '.concat(loadedClass || 'image-loaded');
    }
    if (className) {
      classes += ' '.concat(className)
    }

    return (
      <img
        ref={ el => { this.img = el; } }
        className={ classes }
        src={ src }
        onLoad={ () => {
          this.setState({ loaded: true });
        } }
        { ...props }
      />
    );
  }
};

const { string, bool } = React.PropTypes;
Image.propTypes = {
  className: string,
  show: bool,
  src: string,
  loadedClass: string
};

Image.defaultProps = {
  show: true
};

export default Image;
