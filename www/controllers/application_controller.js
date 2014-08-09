define(['application'], function(app) {

  app.controller('ContentController', function($scope, $rootScope, $ionicSideMenuDelegate) {

    $rootScope.showLoading = function() {
      $rootScope.loading = true;
    }

    $rootScope.hideLoading = function() {
      $rootScope.loading = false;
    }
    
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };

  }) 
});

