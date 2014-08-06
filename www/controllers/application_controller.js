define(['application'], function(app) {

  app.controller('ContentController', function($scope, $ionicSideMenuDelegate, Pedido) {

    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };

  })
  
});
  