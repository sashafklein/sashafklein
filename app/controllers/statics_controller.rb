class StaticsController < ApplicationController
	def landing
		render layout: 'landing'
	end

	def resume
		@skills = Skill.order('stars DESC').all
		@jobs = ResumeItem.jobs
		@education_items = ResumeItem.education
	end

	def portfolio
		@portfolio_items = PortfolioItem.order(id: :asc)
	end
end
