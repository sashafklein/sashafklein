mainModule = angular.module('Main', [])

mainModule.controller "ResumeCtrl", ($scope) -> 
  $s = $scope

  $("[data-toggle=popover]").popover({html: true});

mainModule.controller "PortCtrl", ($scope) -> 
  $s = $scope

  $s.takeToLink = (link) -> window.location.href = link
  $s.h1Class = (link) -> if link.length then 'linked' else ''