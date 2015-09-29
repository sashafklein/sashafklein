#= require directives/markdown

postModule = angular.module('Posts', ['markdown'])

postModule.controller "PostCtrl", ($scope, $http, $routeParams, $sce, $rootScope) -> 
  
  $s = $scope
  
  $s.init = ->
    $s.getPost().then ->
      $s.getPostList() unless $s.postList
      $s.getPreviousPost()
      $s.getNextPost()

  $s.initEdit = -> $s.getPost()
  $s.initNew = -> $s.mainPost = {}
  $s.app = window.MainApp
  $s.userSignedIn = -> $s.app.current_user == 'sashafklein'

  $s.postShowPath = (post) -> if post? then "/posts/#{post.slug}"
  $s.postEditPath = (post) -> if post? then "/posts/#{post.slug}/edit"
  $s.newPostPath = "/posts/new"
  $s.apiPostsPath = "/api/v1/posts"
  $s.apiPostPath = (post_id) -> if post_id? then "/api/v1/posts/#{post_id}" else "/api/v1/posts/#{$routeParams.postSlug}"
  
  $s.createOrUpdate = ->
    _postAction = if $s.mainPost.id? then $s._updatePost else $s._createPost

    _postAction()
      .success (response) -> 
        window.location = $s.postShowPath(response.post)
      .error (response) -> 
        console.log( response )
  
  $s.getPost = ->
    $http.get( $s.apiPostPath() )
      .success (response) -> 
        $s.mainPost = response
      .error (response) -> 
        console.log "Something went wrong in getPost!"

  $s.getPostList = (limit) ->

    $http.get($s.apiPostsPath)
      .success (response) -> 
        $rootScope.postList = response
      .error (response) -> 
        console.log "Something went wrong in getPostList !"

  $s.getPreviousPost = ->
    list = _($s.postList).select (post) -> post.id < $s.mainPost.id
    if list.length then $s.previousPost = list[0]

  $s.getNextPost = ->
    list = _($s.postList).select (post) -> post.id > $s.mainPost.id
    if list.length then $s.nextPost = list[list.length - 1]

  $s.postLimit = 8
  $s.postArchivePath = '/posts'
  $s.postsAreLimited = -> $s.postList?.length == $s.postLimit

  $s._neatPostParams = ->
    params = post: 
      name: $s.mainPost.name
      content: $s.mainPost.content
      example: $s.mainPost.example
    if $s.mainPost.id? then params.post = _(params.post).extend {id: $s.mainPost.id}
    if $s.mainPost.date? then params.post = _(params.post).extend {date: $s.mainPost.date}
    return params

  $s._createPost = -> $http.post( $s.apiPostsPath, $s._neatPostParams() )
  $s._updatePost = -> $http.put( $s.apiPostPath($s.mainPost.id), $s._neatPostParams() )