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
      # ContactsMailer.question(contact).deliver
      # flash[:notice] = "Thanks for the message! I'll try to get back to you shortly."
      # redirect_to root_path
      if @email.save
        ContactMailer.contact_message(@email).deliver
        flash.now[:success] = "Your email has sent! I'll try to get back to you shortly."
        redirect_to root_path
      else
        flash.now[:error] = "Please correct the highlighted errors and try again."
        render :new
      end
    end

	end

end
