import { connect } from "react-redux";
import { object, func } from "prop-types";
import { push } from "connected-react-router";

export const BlogLanding = ({ post, dispatch }) => {
  const path = post ? `/blog/${post.slug}` : "/";
  dispatch(push(path));
  return null;
};

BlogLanding.propTypes = {
  post: object,
  dispatch: func
};

const mapStateToProps = state => ({
  post: state.data.posts[state.data.posts.length - 1]
});

export default connect(mapStateToProps)(BlogLanding);
