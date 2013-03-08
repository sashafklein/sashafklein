jQuery ->
	$('.cl').on "click", (e) ->
		e.preventDefault()
		$collapse = $(@).closest('.collapse')
		$collapse.collapse 'toggle'