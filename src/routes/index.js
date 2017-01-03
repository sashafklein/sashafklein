import _ from 'lodash';
import CryptoJS from 'crypto-js';
import React from 'react';
import Home from './Home'
import Resume from './Resume'
import Portfolio from './Portfolio'
import Blog from './Blog';
import BlogArchive from './BlogArchive';
import Notes from './Notes';

if (window) {
  window._ = _;
  window.CryptoJS = CryptoJS;
}

export const createRoutes = (store) => ({
  path: '/',
  indexRoute: { component: Resume },
  childRoutes: [
    { path: 'resume', component: Resume },
    { path: 'portfolio', component: Portfolio },
    { path: 'notes', component: Notes },
    {
      path: 'blog',
      onEnter: (params, replace) => {
        const state = store.getState();
        const newest = state.data.posts[state.data.posts.length - 1];
        return replace(`/blog/${newest.slug}`)
      }
    },
    {
      path: 'blog/archive',
      component: BlogArchive
    },
    {
      path: 'blog/:postSlug',
      component: Blog
    },
  ]
})

export default createRoutes
