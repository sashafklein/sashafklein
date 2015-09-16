module ApplicationHelper
	def full_title(page_title)
    base_title = "Sasha Klein"
    if page_title.empty?
      base_title
    else
      "#{base_title} | #{page_title}"
    end
  end

  def body_class
    controller.controller_name == "statics" ? controller.action_name : controller.controller_name
  end

  class HTMLwithPygments < Redcarpet::Render::HTML
    def block_code(code, language)
      Pygments.highlight(code, lexer: language)
    end
  end

  def markdown(text)
    renderer = HTMLwithPygments.new(hard_wrap: true)
    options = {
      nowrap: true,
      autolink: true,
      no_intra_emphasis: true,
      fenced_code_blocks: true,
      lax_html_blocks: true,
      strikethrough: true,
      superscript: true
    }
    Redcarpet::Markdown.new(renderer, options).render(text).html_safe
  end

  def previous(post)
    Post.find_by_id(post.id - 1)
  end

  def link_to_add_fields(name, f, association)
    new_object = f.object.send(association).klass.new
    id = new_object.object_id
    fields = f.fields_for(association, new_object, child_index: id) do |builder|
      render(association.to_s.singularize + "_fields", f: builder)
    end
    link_to(name, '#', class: "add_fields", data: {id: id, fields: fields.gsub("\n", "")})
  end

  def has_link?(skill)
    link_value(skill) == "#" ? "not" : ""
  end

  def link_value(skill)
    skill.link.present? ? skill.link : "#"
  end

  def top?(index)
    index > 0 ? "not-top" : "top"
  end

  def photo_margin_top?(index)
    index > 0 ? "margin-top: 10px" : ""
  end

  def collapse_button(item)
    item.collapse_button.present? ? item.collapse_button : "+"
  end

  def field(form, obj, att)
    val = obj[att]
    if val.is_a? String
      if obj == 'education' || val == 'jobs'
        form.select att, options_for_select(['education', 'jobs'])
      else
        val.length > 100 ? form.text_area(att) : form.text_field(att)
      end
    elsif val == true || val == false
      form.select att, options_for_select([true, false])
    else
      form.text_field att
    end
  end
  
  def item_edit_path(obj)
    send( "edit_#{obj.class.to_s.underscore}_path", obj )
  end

  def item_new_path(controller)
    send( "new_#{ controller.object_class.to_s.downcase }_path" )
  end

end