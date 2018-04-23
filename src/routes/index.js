import _ from 'lodash';
import Resume from './Resume';
import Portfolio from './Portfolio';
import Blog from './Blog';

if (window) {
  window._ = _;
}

export const createRoutes = (store) => ({
  path: '/',
  indexRoute: { component: Resume },
  childRoutes: [
    { path: 'resume', component: Resume },
    { path: 'projects', component: Portfolio },
    {
      path: 'blog',
      onEnter: (params, replace) => {
        const state = store.getState();
        const newest = state.data.posts[state.data.posts.length - 1];
        return replace(`/blog/${newest.slug}`);
      }
    },
    {
      path: 'blog/:postSlug',
      component: Blog
    },
    {
      path: '*',
      component: Resume,
      onEnter: (params, replace) => replace('/resume')
    }
  ]
});

export default createRoutes;
