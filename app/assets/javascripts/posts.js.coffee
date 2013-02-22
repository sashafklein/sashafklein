# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

jQuery ->
	# Ajax search on submit
	$('.search_form').submit( ->
	    $.get(this.action, $(this).serialize(), null, 'script')
	    false
  )
  # # Ajax search on keyup
  # $('#products_search input').keyup( ->
  #   $.get($("#notes_search").attr("action"), $("#notes_search").serialize(), null, 'script')
  #   false
  # )