#= require directives/markdown

postModule = angular.module('Posts', ['markdown'])

postModule.controller "PostCtrl", ($scope, $http, $location) -> 

  $s = $scope

  $s.postLimit = 5
  $s.apiPostsPath = '/api/v1/posts'

  $s.init = ->
    $s.getPost().then ->
      $s.getPostList().then ->
        $s.getPreviousPost()
        $s.getNextPost()
  
  $s.postShowPath = (post) ->
    if post?
      "/posts/#{post.slug}"

  $s.postEditPath = (post) ->
    "/posts/#{post.slug}/edit"

  $s.apiPostPath = () ->
    "/api/v1/posts/#{$s._slug()}"

  $s._slug = ->
    path = $location.absUrl()
    split = path.split('/')
    split[split.length - 1]

  $s.getPost = ->
    $http.get( $s.apiPostPath() )
      .success (response) ->
        $s.mainPost = response
      .error (response) ->
        console.log "Something went wrong!"

  $s.getPostList = ->
    $http.get($s.apiPostsPath, params: { limit: $s.postLimit })
      .success (response) ->
        $s.postList = response
      .error (response) ->
        console.log "Something went wrong!"

  $s.getPreviousPost = ->
    list = _($s.postList).select (post) -> post.id < $s.mainPost.id
    if list.length
      $s.previousPost = list[0]

  $s.getNextPost = ->
    list = _($s.postList).select (post) -> post.id > $s.mainPost.id
    if list.length
      $s.nextPost = list[list.length - 1]