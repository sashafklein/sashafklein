import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Markdown from 'components/Markdown';
import SlideMenu from 'components/SlideMenu';
import CoreLayout from 'containers/CoreLayout';
import BlogMenu from './BlogMenu';

export const Blog = ({ history, posts, pathname }) => {
  const post = posts.find(p => (
    pathname
      ? pathname.split('blog/')[1].includes(p.slug)
      : null
  ));

  if (!post) {
    history.push('/blog');
    return null;
  }

  return (
    <CoreLayout className="page-container blog">
      <div>
        <div className="container posts-show">
          <div className="content-section">
            <h1 className="small-buffer-top">
              { post.name }
              <small>
                {' '}
(
                { post.createdAt }
)
              </small>
            </h1>

            <Markdown className="markdown markdown-container" source={ post.text } />
            <div className="example" />
          </div>
        </div>
        <SlideMenu className="blog-menu">
          <BlogMenu />
        </SlideMenu>
      </div>
    </CoreLayout>
  );
};

const { array, shape, func, string } = PropTypes;
Blog.propTypes = {
  posts: array,
  history: shape({ push: func }),
  pathname: string
};

const mapStateToProps = state => ({
  posts: state.data.posts,
  pathname: state.router.location.pathname
});

export default connect(mapStateToProps)(Blog);
