Writing about coding inevitably (and pretty immediately) means displaying code. Doing so clearly, easily, and consistently is a good deal more complicated than it appears. Since I've now come up with a system I'm very happy with, I figured that documenting the process might prove helpful to anyone with similar goals who finds this post.

A basic code block involves either a "pre" or "code" tag, into which one inserts the code, and, in my case a div wrapping it and giving it some styling. As in the below:

```
# view.html.erb
<div class="codebox">
  <pre lang="html">
<h4>Display code goes here.</h4>
<p>Note how it is unindented, so it doesn't start far right in the pre/code box</p>
<small>Imagine what a problem that would be with lots of code that needs to look clear</small>
    </pre>
</div>
```

To get this icky-looking and repetitive (read, not [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself)) code out of my view, my original solution was to define a partial, similar to those I used for expand/collapsing, into which one could feed the title, content, and language of a code block, and which would wrap the above in both pre tags and a div for formatting:

```
# _box.html.erb
<% lang ||= "" %>
<% language = "lang='#{lang}'" %>

<div class="codebox">
 <% if title %>
  <h3><%= title %></h3>
 <% end %>
 <%= text %>
</div>

```

And I just call it like this:

```
# view_page.html.erb
<%= render partial: 'box', locals: { title: '_box.html.erb', lang: 'html', text: '
<div class\"this\">
    <div class=\"solution\">
     <div class=\"is still\">
      <p>Really really messy.</p>
     </div>
    </div>
</div>' } %>

```

There are a number of problems with this solution. For one, it is really not close to ideally DRY. Every single time I coded text, I'd have to call a partial, although I would save myself from writing 6 tags each time. For another, the solution was ugly and unreadable, because in order to indent my code properly, I had to glom it to the left of my screen every time, otherwise, each line would begin heavily indented.

Also, extremely annoyingly, I had to escape quotes (as in the above) or ensure that all the inside quotes are single and those in the partial double (or vice versa).

Then there's the problem of the inevitable size and mess of my blog view file. Typing blog posts in HTML is easy enough, but as I posted more and more, the file would bloat to extraordinary proportions and would become truly confusing to maintain and slow to load. A "fat" model and "thin" view is a Rails best practice for a reason, and ideally, I would push the posts into a model that could be called on to automatically paste and format each post -- otherwise, why use Rails?

Using [MVC](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) for this language-complex purpose with its specific requirements (auto unindentation, code blocks and executed HTML, simplicity) would require a complete rethinking and several gems.