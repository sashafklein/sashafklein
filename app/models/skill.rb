class Skill < ActiveRecord::Base

  def link_options
    if link
      popover_options = {
        toggle: "popover", 
        placement: "top", 
        content: "<p>#{tooltip}</p><a href='#{link}' target='_blank'>Follow Link</a>" 
      }
      options = tooltip ? { data: popover_options } : { href: link }
      options.merge({ class: 'skill_links link' })
    else
      { class: 'skill_links not' } 
    end
  end

end