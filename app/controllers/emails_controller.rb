require 'math_captcha'

class EmailsController < ApplicationController

	def new
    @captcha = MathCaptcha.new
  	@email = Email.new
  end

	def create
    @captcha = MathCaptcha.decrypt(params[:captcha_secret])
  	@email = Email.new(params[:email])

    unless @captcha.correct?(params[:captcha])
        flash.now[:error] = "Please make sure you answered the math question correctly."
        render :new
    else
      if @email.save
        if ContactMailer.contact_message(@email).deliver
          flash.now[:success] = "Your email has sent! I'll try to get back to you shortly."
          redirect_to root_path
        else
          flash.now[:error] = "Something isn't working, and I'll fix it shortly. Get in touch through oDesk."
          redirect_to root_path
        end
      else
        flash.now[:error] = "Please correct the highlighted errors and try again."
        render :new
      end
    end

	end

end
