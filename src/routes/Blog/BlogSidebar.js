import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export const BlogSidebar = ({ posts, index }) => {
  const next = posts[index + 1];
  const prev = posts[index - 1];

  return (
    <div>
      <h1>Recent Posts</h1>
      <ul className="blog-sidebar link-list">
        {
          posts.slice(0, 8).map((post, postIndex) => (
            <li key={ postIndex }>
              <Link to={ `/blog/${post.slug}` }>
                { post.name + ' ' }
                <small>{ post.createdAt }</small>
              </Link>
            </li>
          ))
        }
      </ul>
      <div className="centerify">
        <h6>---</h6>
        <p>Showing 8 most recent.</p>
        <p className="blue-links">
          <span>
            See <Link to={ `/blog/archive` }>archive</Link> for more.
          </span>
        </p>
      </div>
      <br/>
      <div className="prevnext">
        {
          prev && <div className="prev-post">
            <Link to={ `/blog/${prev.slug}` }>PREV</Link>
          </div>
        }
        {
          next && <div className="next-post">
            <Link to={ `/blog/${next.slug}` }>NEXT</Link>
          </div>
        }
      </div>
      <br/>
    </div>
  );
};

export default BlogSidebar;
