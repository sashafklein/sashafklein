class UsersController < ApplicationController
	
	# def new
	#   @user = User.new
	# end

	# def create
	#   @user = User.new(params[:user])
	#   if @user.save
	#     sign_in @user
	#     redirect_to root_url, notice: "Thank you for signing up!"
	#   else
	#     render "new"
	#   end
	# end

	def show
		sign_out(current_user) if current_user
		redirect_to root_path
	end
end
