mainModule = angular.module('Main', [])

mainModule.controller "ResumeCtrl", ($scope) ->
  $s = $scope

  $("[data-toggle=popover]").popover({html: true});
  $('.skills-tab, .experience-tab').on 'click', ->
    $('.skills-overlay').toggleClass('closed')
    $('.skills-tab').toggleClass('closed')
    $('.experience-tab').toggleClass('closed')

  $('.expandable-panel-title').on 'click', (el) ->
    $(el.target).closest('.panel').toggleClass('closed')

mainModule.controller "PortCtrl", ($scope) ->
  $s = $scope

  $s.takeToLink = (link) -> window.location.href = link
  $s.h1Class = (link) -> if link.length then 'linked' else ''