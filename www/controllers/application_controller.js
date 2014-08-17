define(['application'], function(app) {

  app.controller('ContentController', function($scope, $rootScope, $state, $ionicSideMenuDelegate) {

    $rootScope.showLoading = function() {
      $rootScope.loading = true;
    }

    $rootScope.hideLoading = function() {
      $rootScope.loading = false;
    }
    
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.toggleRight = function() {
      $ionicSideMenuDelegate.toggleRight();
    };

    $scope.goBack = function() {
      if($ionicSideMenuDelegate.isOpenLeft())
        $scope.toggleLeft();
      else if($ionicSideMenuDelegate.isOpenRight())
        $scope.toggleRight();
      else if($state.current.name == 'pedidos')
        navigator.app.exitApp();
      else
        history.back();
    }

    document.addEventListener('menubutton', $scope.toggleLeft, false);

    document.addEventListener('backbutton', $scope.goBack, false);

  });

});

