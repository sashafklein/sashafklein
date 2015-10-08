class ApplicationController < ActionController::Base
  protect_from_forgery

	def authorize
	  redirect_to resume_path, danger: "Not authorized" if current_user.nil?
	end

  private

  def after_sign_in_path_for(resource)
    wikis_path
  end

  def after_sign_out_path_for(resource)
    root_path
  end
end
