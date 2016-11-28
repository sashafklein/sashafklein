#= require_self

#= require controllers/PostCtrl
#= require controllers/MainCtrls
#= require controllers/example

#= require directives/markdown
#= require directives/preview
#= require directives/render_html

MainApp = angular.module("MainApp", [
  # modules the app depends on
  "ngRoute"
  "Posts"
  'ui.bootstrap'
  'Main'
  'Example'
  'Preview'
  'RenderHtml'
])

MainApp.config ($routeProvider, $locationProvider) ->

  $locationProvider.html5Mode(true)

  $routeProvider
    .when '/',
      {
        templateUrl: 'post_archive.html',
        controller: 'PostCtrl'
      }
    .when '/new',
      {
        templateUrl: 'new_post.html',
        controller: 'PostCtrl'
      }
    .when '/:postSlug',
      {
        templateUrl: 'show_post.html',
        controller: 'PostCtrl'
      }
    .when '/:postSlug/edit',
      {
        templateUrl: 'edit_post.html',
        controller: 'PostCtrl'
      }
    .otherwise
      redirectTo: '/'