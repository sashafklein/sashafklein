class ResumeItem < ActiveRecord::Base
  
  scope :education, -> { where(kind: 'education') }
  scope :jobs, -> { where(kind: 'jobs') }

  has_many :roles
  
  def collapse
    starts_open ? 'dont' : 'do'
  end

  def subtitle
    role_string = "<em>#{ roles.map(&:name).join(', ') }</em>"
    "<strong>(#{ [date_string, role_string].join(' - ') })</strong>" 
  end

  def date_string
    ordered = roles.order(started: :asc)
    dates = [print_date( ordered.first.started, ordered.first.show_months), print_date( ordered.last.ended, ordered.last.show_months)].compact
    dates.join('-')
  end

  def location_and_date_string
    string = [roles.first.location, date_string].reject(&:blank?).join(', ')
    "<strong>(#{ string })</strong>"
  end

  def print_date(date, show_months)
    return nil unless date
    show_months ? date.strftime('%b %Y') : date.strftime('%Y')
  end

end