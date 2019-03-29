/* eslint react/no-multi-comp: 0 */
import React from 'react';
import { connect } from 'react-redux';
import Highlight from 'react-highlight';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

import './atom-dark.scss';

const LinkNode = ({ href, children, alt, title }) => {
  if (href.includes('http')) {
    return (<a href={ href } alt={ alt } title={ title }>{ children }</a>);
  } else {
    return (<Link to={ href } alt={ alt } title={ title }>{ children }</Link>);
  }
};

class Code extends React.Component {
  constructor (props) {
    super(props);
    this.state = { width: window.innerWidth };
  }

  componentDidMount () {
    this.updateDimensions();
    window.addEventListener('resize', () => { this.updateDimensions(); });
  }

  componentWillUnmount () {
    window.removeEventListener('resize', () => { this.updateDimensions(); });
  }

  updateDimensions () {
    this.setState({ width: window.innerWidth });
  }

  render () {
    const { language, literal } = this.props;
    const { width } = this.state;
    let lines = literal.split('\n');

    if (lines.length > 0) {
      const reg = new RegExp(/#\s*[a-z|A-Z|0-9|\-|_|/]*(\.[a-z]{2,}){1,}/g);
      let title;

      if (reg.test(lines[0]) || ['bash', 'console'].some(w => lines[0].includes(w))) {
        title = <h6>{lines[0].replace('#', '').trim()}</h6>;
        lines = lines.slice(1);
      }

      return (
        <div style={ { maxWidth: `${width - 40}px` } }>
          { title }
          <Highlight className={ language }>{ lines.join('\n') }</Highlight>
        </div>
      );
    } else {
      return <Highlight className={ language }>{ literal }</Highlight>;
    }
  }
}

const Markdown = ({ source, className }) => (
  <ReactMarkdown
    source={ source }
    className={ className }
    escapeHTML={ true }
    renderers={ {
      CodeBlock: Code,
      Link: LinkNode,
      // Image: Image
    } }
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
  literal: string
};

export default connect()(Markdown);
