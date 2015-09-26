class Api::V1::PostsController < ApiController

  def new
    render json: { post: Post.new }
  end

  def show
    post = Post.find_by_slug_or_id(params[:id])
    return error(404) unless post
    render json: post.to_json
  end

  def index
    posts = Post.all.order(created_at: :desc)
    render json: posts.to_json
  end

  def create
    date = date_from_string( params[:post].delete(:date) )
    post = Post.new post_params
    post.created_at = date if date
    if post.save!
      render json: {post: post}
    else
      error(500)
    end
  end

  def update
    post = Post.find_by_slug_or_id( post_params.delete :id )
    
    if post.update_attributes(post_params)
      render json: {post: post}
    else
      error(500)
    end
  end

  private

  def date_from_string(date_string)
    specified_date = Date.parse(date_string)
    specified_date < Date.today ? specified_date : Date.today
  rescue
    nil
  end

  def post_params
    params.require(:post).permit(:example, :name, :content)
  end
end