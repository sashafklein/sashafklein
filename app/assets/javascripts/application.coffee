#= require jquery
#= require jquery_ujs
#= require lib/angular.min
#= require lib/angular-resource.min
#= require lib/angular-route.min
#= require lib/underscore.min
#= require lib/angular-spinkit
#= require_tree .

MainApp = window.MainApp

$ ->
  $('.hamburger').on 'click', ->
    $('.header-bar').toggleClass('hamburger-open')

  $('.alert').on 'click', (el) ->
    $('.alert').hide()
