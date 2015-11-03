mainModule = angular.module('Main', [])

mainModule.controller "ResumeCtrl", ($scope) -> 
  $s = $scope

  $("[data-toggle=popover]").popover({html: true});