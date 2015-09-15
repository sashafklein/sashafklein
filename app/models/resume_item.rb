class ResumeItem < ActiveRecord::Base
  
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