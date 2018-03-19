import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Highlight from 'react-highlight';

import Markdown from 'components/Markdown';
import SlideMenu from 'components/SlideMenu';
import CoreLayout from 'containers/CoreLayout';
import BlogMenu from './BlogMenu';

import { toggleSetting } from 'store/actions';

export const Blog = ({ posts, dispatch, tabOpen }) => {
  const post = posts.find(p => location.pathname
    ? location.pathname.split('blog/')[1].includes(p.slug)
    : null)

  if (!post) {
    browserHistory.push('/blog');
    return null;
  }

  const postIndex = posts.indexOf(post);

  return (
    <CoreLayout className={ `blog` }>
      <div>
        <div className="container posts-show">
          <div className="content-section">
            <h1 className="small-buffer-top">
              { post.name }
              <small> ({ post.createdAt })</small>
            </h1>

            <Markdown className="markdown markdown-container" source={ post.text }/>
            <div className="example" />
          </div>
        </div>
        <SlideMenu className="blog-menu" >
          <BlogMenu />
        </SlideMenu>
      </div>
    </CoreLayout>
  );
};

const mapStateToProps = state => ({
  posts: state.data.posts,
  tabOpen: state.settings.tabOpen
});

export default connect(mapStateToProps)(Blog);