import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import CoreLayout from 'containers/CoreLayout';

export class BlogArchive extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '' }
  }

  render() {
    const { posts } = this.props;
    return(
      <CoreLayout className="blog">
        <div className="container">
          <div className="centerify archive">
            <h1>The Archives</h1>
            <ul className="blog-links">
              <input
                type="text"
                style={ { textAlign: 'left', margin: 'auto',  fontSize: '30px' } }
                onChange={ event => {
                  this.setState({ query: event.target.value })
                }}
              />

              <div className="centerify archive" id="list">
                {
                  posts.filter(p => (p.name + p.text).toLowerCase().includes(this.state.query.toLowerCase()))
                       .map((post, postIndex) => (
                    <h2>
                      <Link className="post-link" to={ `/blog/${post.slug}` }>
                        { post.name }
                        <small> { post.createdAt }</small>
                      </Link>
                    </h2>
                  ))
                }
              </div>
            </ul>
          </div>
        </div>
      </CoreLayout>
    )
  };
}

const mapStateToProps = state => ({
  posts: state.data.posts
});

export default connect(mapStateToProps)(BlogArchive);
