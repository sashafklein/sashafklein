class Role < ActiveRecord::Base
  belongs_to :resume_item

  def print_date
    [format_date(started), format_date(ended)].join('-')
  end

  def format_date(date)
    return nil unless date
    show_months ? "<span class='date'>#{ date.strftime('%b %Y') }</span>" : date.strftime('%Y')
  end

  def subtitle
    s = "<span class='role-name'>#{ name }</span>"
    s += " #{ location_and_date_string }" if location_and_date_string.length > 0
    s
  end

  def location_and_date_string
    loc_string = location ? "<strong>(#{ location })</strong>" : nil
    contents = [loc_string, print_date].reject(&:blank?).join(" - ")
    return "<small>#{contents}</small>"
  end

end
