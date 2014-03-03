angular.module("RenderHtml", []).directive "renderHtml", ->
  restrict: "A"
  scope:
    renderHtml: "@"
  link: (scope, element, attrs) ->
    scope.$watch "renderHtml", (newVal) ->
      element.html(newVal)