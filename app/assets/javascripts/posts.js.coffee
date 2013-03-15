# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

@search = ->
  $.get $('#posts_search').attr("action"), $("#posts_search").serialize(), null, "script"

$ ->
  $('#posts_search').submit (e) ->
    e.preventDefault()
    search()