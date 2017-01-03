import React from 'react';
import { connect } from 'react-redux';
import Highlight from 'react-highlight';
import Markdown from 'components/markdown';
import CoreLayout from 'containers/CoreLayout';
import BlogSidebar from './BlogSidebar';

export const Blog = ({ posts }) => {
  const post = posts.find(p => location.pathname
    ? location.pathname.split('blog/')[1].includes(p.slug)
    : null)
  const postIndex = posts.indexOf(post);

  return (
    <CoreLayout className="blog">
      <div className="container posts-show">
        <div className="sidebar hide-medium">
          <BlogSidebar posts={ posts } index={ postIndex } />
        </div>

        <div className="content-section">
          <h1 className="small-buffer-top">
            { post.name }
            <small> ({ post.createdAt })</small>
          </h1>

          <Markdown className="markdown markdown-container" source={ post.text }/>
          <div className="example" />
        </div>
      </div>
      <div className="show-medium light-gray-bg small-sidebar">
        <div className="container">
          <BlogSidebar posts={ posts } index={ postIndex } />
        </div>
      </div>
    </CoreLayout>
  );
};

const mapStateToProps = state => ({
  posts: state.data.posts
});

export default connect(mapStateToProps)(Blog);