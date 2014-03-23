class PostsController < ApplicationController

  before_filter :authorize, only: [:new, :edit, :destroy]

  def index
    render '/ng_templates/template'
  end

  # Post and list fetched in angular
  def show
    render '/ng_templates/template'
  end

  def devlog
    post = Post.order('created_at DESC').first
    redirect_to "/posts#/#{post.slug}"
  end

  def new
    render '/ng_templates/template'
  end

  def edit
    render '/ng_templates/template'
  end

  def create
    @post = Post.new(params[:post])
    @post.save!
  end

  def update
    @post = Post.find(params[:id])

    respond_to do |format|
      if @post.update_attributes(params[:post])
        format.html { redirect_to @post, notice: 'Post was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy

    respond_to do |format|
      format.html { redirect_to archive_path }
      format.json { head :no_content }
    end
  end

end
