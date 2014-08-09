define(['application'], function(app) {

  app.controller('ContentController', function($scope, $rootScope, $ionicSideMenuDelegate) {

    $rootScope.showLoading = function() {
      $scope.loading = true;
    }

    $rootScope.hideLoading = function() {
      $scope.loading = false;
    }
    
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };

  }) 
});

