import React from 'react';
import { connect } from 'react-redux';
import Highlight from 'react-highlight';
import { Link } from 'react-router';

import ReactMarkdown from 'react-markdown';
import { toggleSetting } from 'store/actions';

import './atom-dark.scss';

const Code = ({ literal, language }) => <Highlight className={ language }>{ literal }</Highlight>;
const LinkNode = ({ href, children, alt, title }) => {
  if (href.includes('http')) {
    return (<a href={ href } alt={ alt } title={ title }>{ children }</a>);
  } else {
    return (<Link to={ href } alt={ alt } title={ title }>{ children }</Link>);
  }
};

class Markdown extends React.Component {
  componentWillReceiveProps(newProps) {
    if (newProps.source !== this.props.source) {
      this.props.dispatch(toggleSetting('blogMenuOpen', false));
    }
  }

  render() {
    const { source, className } = this.props;
    return (
      <ReactMarkdown
        source={ source }
        className={ className }
        escapeHTML={ true }
        renderers={{
          CodeBlock: Code,
          Link: LinkNode
        }}
      />
    );
  }
};

export default connect()(Markdown);
