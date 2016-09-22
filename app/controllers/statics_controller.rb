class StaticsController < ApplicationController
	def landing
		render layout: 'landing'
	end

	def resume
		@skills = Skill.order('stars DESC').all
		items = ResumeItem.joins(:roles).order('roles.started DESC')
		@jobs = items.jobs.to_a.uniq
		@education_items = items.education.to_a.uniq
	end

	def portfolio
		@portfolio_items = PortfolioItem.order(order: :asc)
	end
end
