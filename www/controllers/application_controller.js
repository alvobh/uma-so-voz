define(['application'], function(app) {

  app.controller('ContentController', function($scope, $rootScope, $ionicSideMenuDelegate) {
    
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };

  })
  
});
  