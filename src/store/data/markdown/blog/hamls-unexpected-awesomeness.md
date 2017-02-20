I resisted HAML. I figured that since I'd preferred Ruby to [Python](http://www.python.org), with its obligatory indentation, I'd prefer ERB -- which treats Embedded Ruby like just more tags -- to HAML's careful tabbing.

I was also driven away from HAML by fears about functionality, not just syntax. I had an opinion that while largely equivalent in functionality, HAML's capabilities came just a bit short of those of ERB.

In particular, because HAML closes off all tags automatically, it prohibits half tags in HTML documents. This may seem irrelevant -- when on earth would you need a single div tag? -- but, in fact, it made certain tricks I'd been pulling non-functional.

A good example is my [expand-collapse](/blog/1-expand-collapse) method, (now in HAML-inspired obsolescence), which involved opening three divs in a partial, then filling in the contents to be expanded/collapsed, and, finally, closing those divs in the main document calling the partial. In other words, in addition to other code, I'd put this in my partial:

```
# partial.html.erb
<div class="cl">
    <div class="collapse-group">
        <div class="collapse">
```

and then this in the template, right after calling the partial:

```html
# page.html.erb
        Some content to be toggled between visibility.
        </div>
    </div>
</div>
```

I was pleased with this hack, but it was just that -- hacky. HAML forced me into a corner, and made me realize that this trick was more trouble than it was worth. In fact, the HAML equivalent was significantly cleaner, clearer, and easier to write than the ERB equivalent (which can be read in its entirety in that post):

```haml
# page.html.haml
.cl
  .collapse-group
    %h3.squeeze.bold
      Title of Expand Group
      %small Subtitle (more subtitle)
      %a.bundle.unbold{ href: '#'} Expansion link
    .collapse.inset
      Content goes here
```

Note the lack of crazy partial variable-passing hacking, and the unlimited nature of specific alterations to the theme.

So, only two days into some contract work I've been doing for [Bloc](http://bloc.io"), I've been converted, both to HAML and to [SASS](http://http://sass-lang.com/), a similarly indentation-depented extension of CSS. In refactoring my code, I've had the pleasure of deleting weird-looking files like my collapse partial, and of reducing my line count by almost a third.

I'll add myself to the long list of developers who now feel that HAML is simply superior to ERB for its ease, its clarity, and how effectively it forces coders into best practices.