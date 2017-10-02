[Meatup](/projects#meatup) involved lots of data. Certain pages, like the "log" page where butchers were to keep track of individual cuts, were completely oversaturated with information, and would take amounts of time to sort through that were simply prohibitive, given most butchers' lack of interest in computerizing their work flow.

Take a look at the below strangely named cow, and imagine sorting through all 93 packages of ground meat.

![meatup-log]()

Since every package was associated with a given user and had an expected and actual weight, butchers had to comb through long lists of cuts (for cows, as MeatUp broke them down, there were 22 different cuts, totaling hundreds of packages), to find the right one to update after they weighed it.

To simplify the process both visually and practically, I looked into a simple Javascript expand/collapse function, and ended up homebrewing a neater, more adaptable version from something I found in a blog.

```coffeescript
# expand.js.coffee
jQuery ->
    $('.cl .bundle').on "click", (e) ->
        e.preventDefault()
        $collapse = $(@).closest('.collapse-group').find('.collapse')
        $collapse.collapse 'toggle'
```

The idea is to use JQuery to define links as collapse triggers (identified through the "cl" and "bundle" classes), then use Bootstrap's smoothly animated collapse function to toggle hidden material in a "collapse group" back and forth when the link is clicked. For example:

```html
# view.html.erb
<div class="cl" style="text-align:center">
    <div class="collapse-group">
            <h2>The "Title" of What I'm hiding<small>(the optional subtitle)<small>
                <a class="bundle" href='#'>(expand/collapse term)</a>
            </h2>
        <div class="collapse">

            <p>Whatever I so desire goes in here, to be expanded and collapsed.</p>

        </div>
    </div>
</div>
```

The code works like a charm on the browser. The problem, though, is lack of code legibility and, related, simple size. Moreover, any change you want to make to the display (links of different sizes, including subtitles, changing the expand/collapse term) is relatively labor intensive and messy.

So, for [my home page](/resume), I turned the function into a rails partial with variables for altering display specifics relegated to locals.

```erb
# _collapse_start.html.erb
<% sub ||= "" %>
<% term ||= "(expand)" %>
<% style ||= "" %>

<div class="cl" style="text-align:center">
<div class="collapse-group">
    <<%=tag%> class="squeeze" style=<%="#{style}"%>>
        <%=title%>
        <% if sub != "" %>
            <small><%= sub %></small>
        <% end %>
        <a class="bundle" href='#'><%= term %></a>
    </<%=tag%>>
<div class="collapse">
```

It may look ugly, but the above code lets me turn any element into a neat, subtitled expand/collapse group of any tag type, with any term as the expand link. Calling the partial is as easy as the below, which produces the expand/collapse group right under it:

```erb
# view.html.erb
<%= render partial: "collapse_start", locals: {
                                        title: "Title",
                                        tag: "h2",
                                        sub: "(subtitle)",
                                        term: '+' } %>

    <p>Here go my secrets.</p>

</div></div></div>
```