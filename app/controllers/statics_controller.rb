require 'ostruct'

class StaticsController < ApplicationController
	
	def about
	end

	def landing
		render layout: 'landing'
	end

	def resume
		@skills = load_content("skills")
		@jobs = load_content("jobs")
	end

	def portfolio
	end
	
	def devlog
		@post = Post.last
		redirect_to @post
	end

	private

	def load_content(filename)
		YAML.load_file( File.join( Rails.root, 'lib', "#{filename}.yml" ) ).map{ |e| OpenStruct.new(e) }
	end


end
