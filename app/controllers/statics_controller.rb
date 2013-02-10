class StaticsController < ApplicationController
	
	before_filter :authorize, only: [:devlog]

	def about
	end

	def resume
	end

	def portfolio
	end
	
	def devlog

		@postlist = Post.all
		@posts = Post.paginate(:page => params[:page], :per_page => 1)

	end

end
