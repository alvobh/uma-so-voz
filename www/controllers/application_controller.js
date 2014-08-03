define(['application'], function(app) {

  app.controller('ContentController', function($scope) {
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
  })
  
});
  