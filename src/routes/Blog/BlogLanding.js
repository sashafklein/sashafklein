import { connect } from 'react-redux';
import { object } from 'prop-types';

export const BlogLanding = ({ post, history }) => {
  const path = post ? `/blog/${post.slug}` : '/';
  history.push(path);
  return null;
};

BlogLanding.propTypes = {
  post: object,
  history: object
};

const mapStateToProps = state => ({
  post: state.data.posts[state.data.posts.length - 1]
});

export default connect(mapStateToProps)(BlogLanding);
