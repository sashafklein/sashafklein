## Module for reusable write/preview toggling
##
## In angular controller:
##    $scope.preview = new Preview
##
## In haml (no particular order):
##   %textarea.{ ng_model: "preview.source", ng_show: '!preview.showing' }
##   .output{ ng_show: 'preview.showing', markdown: '{{preview.output()}}' }
##   %a.button.white{ href: '', ng_click: 'preview.toggle()', ng_disabled: '!preview.hasContent()' } {{ preview.text() }}


preview = angular.module("Preview", [])

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