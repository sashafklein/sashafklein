class StaticsController < ApplicationController
	def about
	end

	def resume
	end

	def portfolio
	end
	
	def devlog

		@post = Post.first

		@expand_collapse1 = "
		jQuery -> 
		 $('.cl .bundle').on 'click', (e) ->
			e.preventDefault()
			$collapse = $(@).closest('.collapse-group').find('.collapse')
			$collapse.collapse 'toggle'
		"

		@expand_collapse2 = "<div class='cl'>
  <div class='collapse-group'>
        <!-- Title, always viewable --> 
        <a class='bundle' href='#'>'Click here to expand'</a> 
    <div class='collapse'>
        <!-- The content to be hidden or shown -->
    </div> 
  </div>
</div>
		"

		@expand_collapse3 = '
			<% sub ||= "" %>
			<% term ||= "(expand)" %>
			<% style ||= "" %>

			<div class="cl">
			<div class="collapse-group">
				<<%=tag%> class="squeeze" style=<%="#{style}"%>> 
					<%=title%> 
					<% if sub != "" %> 
						<small><%= sub %></small>
					<% end %>
					<a class="bundle" href="#"><%= term %></a> 
				</<%=tag%>>
			<div class="collapse">
		'.unindent

		@expand_collapse4 = '<%= render partial: "collapse_start", 
	locals: { title: "Expandable", tag: "h3", sub: "(coded Feb 5th, 2013)", term: "(click me)"" } %>

	<h4><em>Here is the content.</em></h4>
	<p>I can make it whatever I want.</p>

	</div></div></div>
		'.unindent

		@pretty_simple1 = '<% lang ||= "" %>
	<% language = "lang=\'#{lang}\'" %>

	<div class="codebox coderay">
	 <% if title %>
	  <h3><%= title %></h3>
	 <% end %>
	 <%= raw Pygments.highlight(text.unindent) %>
	</div>'

		@pretty_simple2 = "<%= render partial: 'box', locals: { title: '_box.html.erb', lang: 'html', text: '
<div class\"this\">
	<div class=\"solution\">
	 <div class=\"is\">
	  <p>Really really messy.</p>
	 </div>
	</div>
</div>' } %>"

		@pretty_simple3 = "def unindent; gsub(/^\#{scan(\/^\\s+\/\).min\}/, \"\") end"
	end

end
