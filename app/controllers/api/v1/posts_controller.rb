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

  def create
    post = Post.new params[:post].merge( date_from_string(params[:post].delete(:date) ) )
    
    if post.save!
      render json: {post: post}
    else
      error(500)
    end
  end

  def update
    post = Post.find_by_slug_or_id( params[:post].delete :id )
    
    if post.update_attributes(params[:post])
      render json: {post: post}
    else
      error(500)
    end
  end

  private

  def date_from_string(date_string)
    specified_date = Date.parse(date_string)
    date = specified_date > Date.today ? specified_date : Date.today
    { created_at: date }
  rescue
    return {}
  end
end