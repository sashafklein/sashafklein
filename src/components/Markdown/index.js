/* eslint react/no-multi-comp: 0 */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Highlight from "react-highlight";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";

import Image from "components/Image";
import "./atom-dark.scss";

const LinkNode = ({ href, children, alt, title }) => {
  if (href.includes("http")) {
    return (
      <a
        href={href}
        target="blank"
        rel="noopener noreferrer"
        alt={alt}
        title={title}
      >
        {children}
      </a>
    );
  } else {
    return (
      <Link to={href} alt={alt} title={title}>
        {children}
      </Link>
    );
  }
};

const Code = ({ language, value }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(
    () => {
      window.addEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    },
    () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    }
  );

  let lines = value.split("\n");

  if (lines.length > 0) {
    const reg = new RegExp(/#\s*[a-z|A-Z|0-9|\-|_|/]*(\.[a-z]{2,}){1,}/g);
    let title;

    if (
      reg.test(lines[0]) ||
      ["bash", "console"].some(w => lines[0].includes(w))
    ) {
      title = <h6>{lines[0].replace("#", "").trim()}</h6>;
      lines = lines.slice(1);
    }

    return (
      <div
        className="code-box has-title"
        style={{ maxWidth: `${width - 40}px` }}
      >
        {title}
        <Highlight className={language}>{lines.join("\n")}</Highlight>
      </div>
    );
  } else {
    return (
      <div className="code-box">
        <Highlight className={language}>{value}</Highlight>;
      </div>
    );
  }
};

const Markdown = ({ source, className }) => (
  <ReactMarkdown
    source={source}
    className={className}
    escapeHTML={true}
    renderers={{
      code: Code,
      link: LinkNode,
      image: Image
    }}
  />
);

const { string, node } = PropTypes;
LinkNode.propTypes = {
  href: string,
  children: node,
  alt: string,
  title: string
};

Markdown.propTypes = {
  source: string,
  className: string
};

Code.propTypes = {
  language: string,
  value: string
};

export default connect()(Markdown);
