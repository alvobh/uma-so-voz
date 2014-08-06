define(['application'], function(app) {

  app.controller('ContentController', function($scope, $rootScope, Pedido) {

    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };

  })
  
});
  