import React, { useEffect, useState } from "react";
import { node, string, number, bool } from "prop-types";

import "./AnimatedLoader.scss";

export const AnimatedLoader = ({ waitMs, className, children, hide }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (hide) {
      setLoaded(false);
    } else {
      setTimeout(() => {
        setLoaded(true);
      }, waitMs);
    }
  });

  return (
    <div className={`${loaded && !hide ? "loaded" : ""} loader ${className}`}>
      {children}
    </div>
  );
};

AnimatedLoader.propTypes = {
  children: node,
  waitMs: number,
  className: string,
  hide: bool
};

AnimatedLoader.defaultProps = {
  waitMs: 0,
  hide: false
};

export default AnimatedLoader;
