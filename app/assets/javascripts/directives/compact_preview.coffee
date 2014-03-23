compactPreview = angular.module("CompactPreview", [])

compactPreview.factory 'CompactPreview', ($sce) ->

  class CompactPreview

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