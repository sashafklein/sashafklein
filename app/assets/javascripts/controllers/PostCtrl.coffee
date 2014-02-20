#= require directives/markdown

postModule = angular.module('Posts', ['markdown'])

postModule.controller "PostCtrl", ($scope, $http, $routeParams) -> 

  $s = $scope

  $s.postLimit = 8
  $s.apiPostsPath = '/api/v1/posts'
  $s.postArchivePath = '#/'
  $s.postsAreLimited = -> $s.postList?.length == $s.postLimit

  $s.initEdit = -> $s.getPost()
  $s.initNew = ->
    $s.mainPost = {}

  window.s = $s

  $s.init = ->
    $s.getPost().then ->
      $s.getPostList().then ->
        $s.getPreviousPost()
        $s.getNextPost()

  $s.createOrUpdate = ->
    $http.put( $s.apiPostPath($s.mainPost.id || 0), $s._neatPostParams() )
      .success (response) -> 
        window.location = $s.postShowPath(response.post)
      .error (response) -> 
        alert(response)
  
  $s.postShowPath = (post) ->
    if post?
      "#/#{post.slug}"

  $s.postEditPath = (post) ->
    if post?
      "/posts#/#{post.slug}/edit"

  $s.newPostPath = "/posts#/new"

  
  $s.apiPostPath = (post_id) -> 
    if post_id?
      "/api/v1/posts/#{post_id}"
    else
      "/api/v1/posts/#{$routeParams.postSlug}"

  $s.app = window.MainApp

  $s.userSignedIn = -> $s.app.current_user == 'sashafklein'

  $s.getPost = ->
    $http.get( $s.apiPostPath() )
      .success (response) ->
        $s.mainPost = response
      .error (response) ->
        console.log "Something went wrong!"

  $s.getPostList = ->
    unless $s.postList?
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

  $s._neatPostParams = ->
    post: 
      name: $s.mainPost.name
      content: $s.mainPost.content
      id: $s.mainPost.id || 0 