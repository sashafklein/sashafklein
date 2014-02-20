class StaticsController < ApplicationController
	def landing
		render layout: 'landing'
	end

	def resume
		@skills = Skill.all
		@jobs = ResumeItem.jobs
		@education_items = ResumeItem.education
	end

	def portfolio
		@portfolio_items = PortfolioItem.all
	end

end
