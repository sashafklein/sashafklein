import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';

import { bpIsGreaterThan } from 'utils/responsiveHelpers';
import { toggleSetting } from 'redux/actions';
import AnimatedLoader from 'components/AnimatedLoader';

export const BlogMenu = ({ posts, dispatch, tabOpen, breakpoint }) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(tabOpen);

  useEffect(() => {
    setTimeout(() => {
      setOpen(tabOpen);
    }, 150);
  });

  const input = useRef(null);

  useEffect(() => {
    if (bpIsGreaterThan('tabletLg', breakpoint)) {
      input && input.current && input.current.focus();
    }
  });

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
              <AnimatedLoader waitMs={ 50 * index } className="fade-and-slide-up" key={ post.slug }>
                <h2
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

const { array, func, bool, object } = PropTypes;
BlogMenu.propTypes = {
  posts: array,
  dispatch: func,
  tabOpen: bool,
  breakpoint: object
};

const mapStateToProps = state => ({
  posts: state.data.posts,
  location: state.router.location,
  tabOpen: state.settings.tabOpen,
  breakpoint: state.breakpoint
});

export default connect(mapStateToProps)(BlogMenu);
