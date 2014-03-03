angular.module('Example').controller "PreviewExampleCtrl", ($scope, Preview) ->

  $s = $scope

  $s.init = ->
    $s.firstPreview = new Preview "# Here's a header\n## And a subheader" 
    $s.secondPreview = new Preview "Nothing special here"