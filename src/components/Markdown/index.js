import React from 'react';

import Highlight from 'react-highlight';
import { Link } from 'react-router';

import ReactMarkdown from 'react-markdown';

import './monokai.scss';

const Code = ({ literal, language }) => <Highlight className={ language }>{ literal }</Highlight>;
const LinkNode = ({ href, children, alt, title }) => {
  if (href.includes('http')) {
    return (<a href={ href } alt={ alt } title={ title }>{ children }</a>);
  } else {
    return (<Link to={ href } alt={ alt } title={ title }>{ children }</Link>);
  }
};

const Markdown = ({ source }) => (
  <ReactMarkdown
    source={ source }
    escapeHTML={ true }
    renderers={{
      CodeBlock: Code,
      Link: LinkNode
    }}
  />
);

export default Markdown;
