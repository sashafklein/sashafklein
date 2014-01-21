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