import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';

import { toggleSetting } from 'redux/actions';
import AnimatedLoader from 'components/AnimatedLoader';

export const BlogMenu = ({ posts, dispatch, tabOpen }) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(tabOpen);

  useEffect(() => {
    setTimeout(() => {
      setOpen(tabOpen);
    }, 150);
  });

  const input = useRef(null);

  useEffect(() => { input && input.current && input.current.focus(); });

  return (
    <div className="centerify archive">
      <ul className="blog-links">
        {
          open && <AnimatedLoader waitMs={ 100 } className="fade-and-slide-up centerify">
            <input
              ref={ input }
              type="text"
              onChange={ (event) => { setQuery(event.target.value); } }
            />
          </AnimatedLoader>
        }

        {
          open && posts
            .filter(p => (p.name + p.text).toLowerCase().includes(query.toLowerCase()))
            .reverse().map((post, index) => (
              <AnimatedLoader waitMs={ 50 * index } className="fade-and-slide-up">
                <h2
                  key={ post.slug }
                  className="post-link"
                  onClick={ () => {
                    dispatch(push(`/blog/${post.slug}`));
                    dispatch(toggleSetting('tabOpen', false));
                    window.scrollTo(0, 0);
                  } }
                  style={ { textDecoration: 'underline' } }
                >
                  { post.name }
                  <small>
                    {' '}
                  ({ post.createdAt })
                  </small>
                </h2>
              </AnimatedLoader>
            ))
        }
      </ul>
    </div>
  );
};

const { array, func, bool } = PropTypes;
BlogMenu.propTypes = {
  posts: array,
  dispatch: func,
  tabOpen: bool
};

const mapStateToProps = state => ({
  posts: state.data.posts,
  location: state.router.location,
  tabOpen: state.settings.tabOpen
});

export default connect(mapStateToProps)(BlogMenu);
