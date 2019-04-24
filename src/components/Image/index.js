import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Img from "react-image";
import { omit } from "lodash";

import "./Image.scss";

export const Image = props => {
  const { className, show, src, loadedClass } = props;
  const [loaded, setLoaded] = useState(false);
  const image = useRef(null);

  const classes = [
    "image image-comp",
    loaded && show ? loadedClass || "image-loaded" : null,
    className
  ].filter(c => c);

  const allProps = {
    ...omit(props, "show"),
    ref: image,
    onLoad: () => setLoaded(true),
    alt: props.alt || src || "",
    loader: (
      <span className={`image-comp image-loader-gradient ${className}`} />
    ),
    unloader: (
      <span className={`image-comp image-loader-gradient ${className}`} />
    ),
    className: classes.join(" ")
  };

  return <Img {...allProps} />;
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
