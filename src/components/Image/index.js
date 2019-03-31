import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';

import './Image.scss';

export const Image = (props) => {
  const { className, show, src, loadedClass } = props;
  const [loaded, setLoaded] = useState(false);
  const image = useRef(null);

  const classes = [
    'image image-comp',
    (loaded && show)
      ? loadedClass || 'image-loaded'
      : null,
    className
  ].filter(c => c);

  return (
    <Img
      ref={ image }
      className={ classes.join(' ') }
      onLoad={ () => { setLoaded(true); } }
      alt={ props.alt || props.src || '' }
      src={ src }
      loader={ <span className={ `image-comp image-loader-gradient ${className}` } /> }
      {
      ...Object.keys(props)
        .filter(k => !['show'].includes(k)).reduce((obj, k) => ({
          [k]: obj[k]
        }), {})
      }
    />
  );
};

const { string, bool } = PropTypes;
Image.propTypes = {
  className: string,
  show: bool,
  src: string,
  loadedClass: string,
  alt: string
};

Image.defaultProps = {
  show: true
};

export default Image;
