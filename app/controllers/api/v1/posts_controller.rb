class Api::V1::PostsController < ApiController

  before_action :load_post, only: [:show, :update]
  def new
    render json: { post: Post.new }
  end

  def show
    return error( message: "No post with id: #{ params[:id] }") unless @post
    render json: @post.to_json
  end

  def index
    posts = Post.all.order(created_at: :desc)
    render json: posts.to_json
  end

  def create
    date = date_from_string( params[:post].delete(:date) )
    post = Post.new post_params
    post.created_at = date if date
    
    post.save!
    render json: {post: post}
  rescue => e
    error( message: e.message )
  end

  def update
    @post.update_attributes!(post_params)
    render json: {post: @post}
  rescue => e
    error(message: e.message)
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

  def load_post
    @post = Post.find_by_slug_or_id(params[:id])
  end
end