class StaticsController < ApplicationController

	def about
	end

	def resume
	end

	def portfolio
	end
	
	def devlog
		@post = Post.last
		redirect_to @post
	end

end
