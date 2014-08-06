define([], function() {

  return function($ionicPlatform, $rootScope) {

    $ionicPlatform.ready(function() {

      // Hide the accessory bar by default 
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      
      // status bar
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }

    });

    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
      $rootScope.$previous = from;
    });

  }

});