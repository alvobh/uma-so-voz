define([], function() {

  return function($ionicPlatform) {

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

  }

});