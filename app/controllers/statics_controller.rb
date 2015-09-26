class StaticsController < ApplicationController
	def landing
		render layout: 'landing'
	end

	def resume
		@skills = Skill.order('stars DESC').all
		roles = Role.order(started: :desc)
		@jobs = ResumeItem.where( id: roles.pluck(:resume_item_id) ).jobs
		@education_items = ResumeItem.where( id: roles.pluck(:resume_item_id) ).education
	end

	def portfolio
		@portfolio_items = PortfolioItem.order(order: :asc)
	end
end
