import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { toggleSetting } from 'store/actions';
import CoreLayout from 'containers/CoreLayout';

export class BlogMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '', searching: false }
  }

  render() {
    const { posts, open, dispatch } = this.props;
    const { searching, query } = this.state;

    return(
      <div className={ `blog-menu ${open ? 'open' : ''}` }>
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
              onChange={ event => {
                this.setState({ query: event.target.value })
              }}
            />

            <div className="centerify archive" id="list">
              {
                posts.filter(p => (p.name + p.text).toLowerCase().includes(this.state.query.toLowerCase()))
                     .reverse().map((post, postIndex) => (
                  <h1 key={ postIndex }>
                    {
                      location.pathname.includes(post.slug) ?
                        <a
                          className="post-link"
                          style={{ textDecoration: 'underline' }}
                          onClick={ () => dispatch(toggleSetting('tabOpen', false)) }
                        >
                          { post.name }
                          <small> ({ post.createdAt })</small>
                        </a> :
                        <Link className="post-link" to={ `/blog/${post.slug}` }>
                          { post.name }
                          <small> ({ post.createdAt })</small>
                        </Link>
                    }
                  </h1>
                ))
              }
            </div>
          </ul>
        </div>
      </div>
    )
  };
}

const mapStateToProps = state => ({
  posts: state.data.posts
});

export default connect(mapStateToProps)(BlogMenu);
