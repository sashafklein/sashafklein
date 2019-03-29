import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { toggleSetting } from 'redux/actions';

export class BlogMenu extends React.Component {
  constructor (props) {
    super(props);
    this.state = { query: '', searching: false };
  }

  render () {
    const { posts, dispatch, location } = this.props;
    const { searching, query } = this.state;

    return (
      <div className="centerify archive">
        <ul className="blog-links">
          <input
            type="text"
            placeholder={ searching || query.length ? '' : 'Search...' }
            onFocus={ () => {
              this.setState({ searching: true });
            } }
            onBlur={ () => {
              this.setState({ searching: false });
            } }
            onChange={ (event) => {
              this.setState({ query: event.target.value });
            } }
          />

          <div className="centerify archive" id="list">
            {
              posts
                .filter(p => (p.name + p.text).toLowerCase().includes(query.toLowerCase()))
                .reverse().map(post => (
                  <h1 key={ post.slug }>
                    {
                      location.pathname.includes(post.slug)
                        ? (
                          <a
                            className="post-link"
                            style={ { textDecoration: 'underline' } }
                            onClick={ () => dispatch(toggleSetting('tabOpen', false)) }
                          >
                            { post.name }
                            <small>
                              {' '}
                            ({ post.createdAt })
                            </small>
                          </a>
                        )
                        : (
                          <Link className="post-link" to={ `/blog/${post.slug}` }>
                            { post.name }
                            <small>
                              {' '}
                            ({ post.createdAt })
                            </small>
                          </Link>
                        )
                    }
                  </h1>
                ))
            }
          </div>
        </ul>
      </div>
    );
  }
}

const { array, func, object } = PropTypes;
BlogMenu.propTypes = {
  posts: array,
  dispatch: func,
  location: object
};

const mapStateToProps = state => ({
  posts: state.data.posts,
  location: state.router.location
});

export default connect(mapStateToProps)(BlogMenu);
