module ApplicationHelper
	def full_title(page_title)
    base_title = "Sasha Klein"
    if page_title.empty?
      base_title
    else
      "#{base_title} | #{page_title}"
    end
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
end