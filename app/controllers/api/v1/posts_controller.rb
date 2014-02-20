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

  def test_user
    if current_user
      render json: { success: true }
    else 
      render json: { error: true }
    end
  end

  def update
    post = Post.find_by_slug_or_id(params[:post].delete(:id)) || Post.new
    
    if post.update_attributes(params[:post])
      render json: {post: post}
    else
      error(500)
    end
  end
end