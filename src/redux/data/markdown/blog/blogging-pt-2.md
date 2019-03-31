So I was left looking for an a) [MVC](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)-based blogging solution that would b) turn a model-object into a correctly-formatted post with c) unindented and stylized codeboxes with language-specific coloring, and which d) allowed for images and in-line links with HTML options (like classes, styles, titles, alts, etc).

I solved each of these problems individually using a variety of gems and homebrewed solutions. To automatically correct code indentation, I borrowed a beautiful string module I found on Stack Overflow which truncates each code snippet, removing all spaces and tabs before the lowest common indentation:

```text
# lib/ext/string.rb
def unindent
  gsub(/^\#{scan(\/^\\s+\/\).min\}/, \"\")
end
```

Because I ideally wanted to avoid hard-coding the body of each post and the divs and pre tags involved in each code block, I decided on Markdown for the posts, using [RedCarpet](https://github.com/vmg/redcarpet) to convert my posts into the Markdown format, outlining code in backticks (`) for codeboxes, and formatting the said boxes' content with the [Pygments.rb](https://github.com/tmm1/pygments.rb) gem.

This would eliminate the need for fully formatted HTML posts or separate attributes for code boxes, text, links, and images, another possibility I'd been considering. Now, I just had to navigate to a new post page on my site, enter the name and content, and the post would automatically be saved in the database and displayed/formatted as I wanted it.

Only one rather hairy problem remained: Markdown made the rendering of HTML and ERB extremely difficult. The docs for markdown said to simply put a new line before each HTML tag, but when I did so, the tags would disappear from the view but not actually render what they were intended to accomplish. This meant no images (unless I followed Markdown's image format, which allowed for no image classes), and no formatting divs around the code boxes.

The solution to this ended up being a single setting in my RedCarpet formatting helper. If I removed "filter_html: true" from the second line of the below, it would execute all styling HTML inside a ["notextile"](http://redcloth.org/textile/html-integration-and-escapement/) tag (and not within a delineated code box).

```ruby
# application_helper.rb
def markdown(text)
  renderer = HTMLwithPygments.new(hard_wrap: true, filter_html: true)
  options = {
    autolink: true,
    no_intra_emphasis: true,
    fenced_code_blocks: true,
    lax_html_blocks: true,
    strikethrough: true,
    superscript: true
  }
  Redcarpet::Markdown.new(renderer, options).render(text).html_safe
end
```

This left me with an imperfect (still partially hardcoded) but relatively easy solution. ERB wouldn't execute, but any HTML images and links would render perfectly (with their classes), I didn't have to harcode paragraphs or codeboxes, all my posts would be stored in the database, and I could include a perfectly formatted, language-colored, titled code box like so.

```
# example post codebox
<notextile><div class="codebox">example post codebox</notextile>

 ` ` `html
<p> Here goes the code</p>
 ` ` `
```

Now it's just happy blogging.