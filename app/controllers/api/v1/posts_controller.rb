class Api::V1::PostsController < ApiController

  def new
    render json: { post: Post.new }
  end

  def show
    post = Post.find_by_slug_or_id(params[:id])
    error(404) unless post
    render json: post.to_json
  end

  def index
    limit = params[:limit] ? params[:limit].to_i : 5
    posts = Post.order('created_at DESC').first(limit)
    render json: posts.to_json
  end

  def update
    id = params[:post].delete :id
    post = id == 0 ? Post.new : Post.find_by_slug_or_id(id)

    if post.update_attributes(params[:post])
      render json: {post: post}
    else
      error(500)
    end
  end
end