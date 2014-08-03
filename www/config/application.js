define(['angular', 'plugins', 'angularIonic', 'uiRouter'], function (angular, plugins) {

  return angular.module('UmaSoVoz', ['ionic', 'ui.router'])
          .run(plugins);

});

