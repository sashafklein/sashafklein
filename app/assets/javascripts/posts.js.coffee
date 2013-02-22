# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$ -> 
  $("#list").live "click", ->
    $.getScript @href
    false

  $("#posts_search input").keyup ->
    $.get $("#posts_search").attr("action"), $("#posts_search").serialize(), null, "script"
    false