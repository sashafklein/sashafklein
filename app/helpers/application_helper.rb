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
    Redcarpet::Markdown.new(renderer, options).render( text ).html_safe
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
    safe_link_to(name, '#', class: "add_fields", data: {id: id, fields: fields.gsub("\n", "")})
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

  def field(form, obj, pair)
    att, type = pair.keys.first, pair.values.first
    val = obj[att]

    return form.select( att, options_for_select( type, val ) ) if type.is_a?(Array)

    case type
      when :id then model_field(att, form, obj)
      when :text then val.is_a?(Array) ? form.text_area(att, { value: val.join("\n") }) : form.text_area(att)
      when :datetime then form.date_field att
      else form.text_field att
    end
  end
  
  def item_edit_path(obj)
    send( "edit_#{obj.class.to_s.underscore}_path", obj )
  end

  def item_new_path(controller)
    send( "new_#{ controller.object_class.to_s.underscore }_path" )
  end

  # To foil the Angular bullshit caused by HTML5 Mode
  def safe_link_to(text, link, options={})
    link_to text, link, options.merge( { target: '_self'} )
  end

  def safe_block_link_to(link, options={}, &block)
    content_tag :a, options.merge( { href: link, target: '_self'} ) do
      yield
    end
  end

  def landing_links( current_user )
    if current_user
      array = [[wikis_path, 'Wiki'], [devlog_path, 'Blog'], [resume_path, 'Resume']]
    else
      array = [[resume_path, 'Resume'], [portfolio_path, 'Portfolio'], [devlog_path, 'Blog']]
    end

    ordinals = ['first', 'second', 'third']
    array.each_with_index.map{ |e, i| { class: ordinals[i], path: e[0], name: e[1] } }
  end

  def landing_button( link )
    content_tag :div, class: "landing_button #{link[:class]}", onclick: "location.href='#{link[:path]}'" do 
      content_tag :div, class: 'inner-text' do
        content_tag :a, href: link[:path] do
          link[:name].to_s.upcase
        end
      end
    end
  end

  private

  def model_field(att, form, obj)
    return '' unless att.to_s.include?("_id")
    model = Object.const_get( att.to_s.gsub("_id", '').camelize )
    collection = model.all
    chooser = [:title, :name, :id].first{ |f| model.column_names.include?(f.to_s) }
    form.select att, options_for_select( model.all.map{ |e| [ e[chooser], e[:id] ] }, obj[att] )
  rescue => e
    ''
  end
end