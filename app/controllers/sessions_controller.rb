class SessionsController < ApplicationController
  def new
  end

  def create
  	user = User.find_by_name(params[:name])
    puts "all"
    puts params
    puts "pre-inspect"
    puts user.inspect
  	if user && user.authenticate(params[:password])
  		session[:user_id] = user.id
      puts "In IF"
  		redirect_to new_post_path
  	else
  		flash.now[:error] = "Invalid password/username combo."
      puts "there"
  		render 'new' 
  	end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path, notice: "Logged Out"
  end
end
