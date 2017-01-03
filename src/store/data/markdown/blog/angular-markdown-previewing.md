
At Bloc, users frequently need to compose something -- a message, an assignment, a post, a comment, an automatic user-specific greeting -- in Markdown. Because we are a student service, and many of our users are not (at first) professional developers, we generally want to allow users to preview their markdown intermittently as they compose it.

I recently tackled this issue of markdown previewing, which used to be a pretty big headache with JQuery but has become quite simple with Angluar.

First, we created a markdown directive using `showdown.js` and `highlight.js` for markdown syntax highlighting:


**markdown.coffee**
```coffeescript
#= require angular
#= require libraries/showdown
#= require libraries/highlight

angular.module("markdown", []).directive "markdown", ->
  converter = new Showdown.converter()
  restrict: "A"

  scope:
    markdown: "@"

  link: (scope, element, attrs) ->
    scope.$watch "markdown", (newVal) ->
      html = converter.makeHtml(newVal)
      element.html(html)

      # syntax highlighting
      element.find('code, pre code').each (i, e) ->
        hljs.highlightBlock(e, '  ')
```

It's attached to the view like this:

**markdown_content.html.haml**

```haml
  .display-md{ markdown: @content }
```

The above angular just watches the element and displays the value assigned to the markdown attribute within the div it's assigned to.

> The `restrict: "A"` means that the "*A*ttribute" on the tag is being read.

> The actual rendering of the content as HTML uses JQuery -- `element.html(html)`.

Using this markdown directive, one easy way to tackle the problem of markdown previewing would look like this:

**hombrewed_preview.html.haml**

```haml
%form
  %textarea{ ng_model: 'input', placeholder: 'Markdown input goes here...' , ng_show: 'writeMode' }
  %div.output{ ng_show: '!writeMode', markdown: 'input' }
  %a{ href: '', ng_click: 'toggleMode()' } {{writeOrPreviewText()}}
  %input{ type: 'submit', ng_submit: 'submitMarkdown()' }
```

There are a couple problems with the above. The first is the repetition. Every time you use markdown previewing, you have to rewrite a `toggleMode()` method (or just write it inline, as, for instance `writeMode = !writeMode`). You'd similarly have to repeat the `writeOrPreviewText()` method, or, otherwise, code it in the HAML by creating two links, one with one word, and one with the other, that display in different cases.

Then there are issues of input sanitization (Angular must explicitly be told to trust input as HTML). And, finally, the pain of stringing that together with a database back-end ("seeding" the markdown with any preexisting text and, say, showing the preview if there's already input, and write mode if not).

To solve this series of issues, I created a Preview directive that creates some defaults to simplify the previewing process:

**preview.coffee**

```coffeescript
preview = angular.module("Preview")

preview.factory 'Preview', ($sce) ->

  class Preview

    constructor: (seed, show_text, edit_text) ->
      @source = seed
      @showing = seed? && seed.length > 0
      @show_text = show_text || "Preview"
      @edit_text = edit_text || "Write"

    toggle: ->
      @showing = !@showing

    text: ->
      if @showing then @edit_text else @show_text

    output: ->
      if @hasContent()
        $sce.trustAsHtml @source

    hasContent: ->
      @source && @source.length > 0

    reset: ->
      @showing = false
      @source = ''
```

The directive can be used as such:

**multi_preview.coffee**

```coffeescript

angular.module("MainApp").controller 'PreviewExampleController', ($scope, gon, Preview) ->
  $s = $scope

  # gon is a tool for directly passing variables from a ruby controller into javascript.
  # Its use is shown below.
  $s.init = ->
    $s.firstPreview = new Preview(gon.first)
    $s.secondPreview = new Preview(gon.second, "Show", "Edit")

```

I pass the preview content in from a ruby controller:

**previews_controller.rb**

```ruby
def show
  gon.first = %Q(
    # Here's a header
    ## And a subheader
  )

  gon.second = "Nothing special here"
  render 'multi_preview'
end
```

Then I use the directive in the view like so:

**multi_preview.html.haml**

```haml
%div{ ng_controller: 'previewExampleController', ng_init: 'init()' }
  %form.first
    %textarea.{ ng_model: "firstPreview.source", ng_show: '!firstPreview.showing' }
    .output{ ng_show: 'firstPreview.showing', markdown: '{{firstPreview.output()}}' }
    %a{ href: '', ng_click: 'firstPreview.toggle()', ng_disabled: '!firstPreview.hasContent()' } {{ firstPreview.text() }}

  %form.second
    %textarea.{ ng_model: "secondPreview.source", ng_show: '!secondPreview.showing' }
    .output{ ng_show: 'secondPreview.showing', markdown: '{{secondPreview.output()}}' }
    %a{ href: '', ng_click: 'secondPreview.toggle()', ng_disabled: '!secondPreview.hasContent()' } {{ secondPreview.text() }}
```

There are future steps that would make this directive considerably neater to use -- basically, nesting other directives inside of it through `transclusion`, so that I could do something like this:

**ideal.html.haml**

```haml
  %previewForm{ content: @content, writeText: 'Edit', showText: 'Show', submitFunction: 'functionOnController()' }
    %inputArea
    %outputArea
    %switchModeButton
```

Although the above allows for a reasonable amount of alteration (where to put various pieces, etc), you could even create a default version that is just a simple `%completePreviewForm` which takes the above arguments and produces the rest.

For now, though, I'm happy with the balance between ease and versatility of `multi_preview.html.haml` which produces the below: