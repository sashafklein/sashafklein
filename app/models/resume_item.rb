class ResumeItem < ActiveRecord::Base
  attr_accessible :title, :subtitle, :link, :description, :starts_open, :kind
  
  scope :education, -> { where(kind: 'education') }
  scope :jobs, -> { where(kind: 'jobs') }
  scope :ordered, -> { order("resume_items.order ASC") }

  def paragraphs
    description.split("\n")
  end

  def collapse
    starts_open ? 'dont' : 'do'
  end
end