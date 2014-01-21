class Api::V1::PostsController < ApiController

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
end