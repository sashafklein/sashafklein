# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

@PostListCtrl = ($scope, $http) ->
  # $http.get("posts.json").success (data) ->
    $scope.posts = 
      [
        name: "Pretty(,) Simple Blogging"
        content: "Fast just got faster with Nexus S."
      ,
        name: "Expand/Collapse"
        content: "The Next, Next Generation tablet."
      ,
        name: "Test1"
        content: "This has some of unusual, unique termlets."
      ]