class EmailsController < ApplicationController
	

	def new
  	@email = Email.new
  end

	def create
  	@email = Email.new(params[:email])

    if @email.save
      redirect_to root_path, notice: "Your email has sent! I'll try to get back to you shortly."
    else
      redirect_to root_path, notice: "Your email didn't send! I've done something wrong, and will fix it ASAP."
    end
	end

end
