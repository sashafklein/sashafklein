$ ->
  if $('body.landing').length
    $(window).resize ->
      $('.inner-text').find('a').css 'z-index', 1