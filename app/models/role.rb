class Role < ActiveRecord::Base
  belongs_to :resume_item

  def print_date
    [format_date(started), format_date(ended)].join('-')
  end

  def format_date(date)
    return nil unless date
    show_months ? date.strftime('%b %Y') : date.strftime('%Y')
  end

  def subtitle
    s = "<strong>#{ name }</strong>"
    s += " #{ location_and_date_string }" if location_and_date_string.length > 0
    s
  end

  def location_and_date_string
    loc_string = location ? "<em>(#{ location })</em>" : nil
    [loc_string, print_date].reject(&:blank?).join(" - ")
  end

end
