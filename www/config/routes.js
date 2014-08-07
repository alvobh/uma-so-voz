define([

  'application',
  '../controllers/pedidos_controller',
  '../controllers/application_controller'

], function(app) { 

  app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('pedidos', {
        url: "/pedidos",
        abstract: true,
        templateUrl: "templates/pedidos/tabs.html"
      })

      // index

      .state('pedidos.all', {
        url: '/all',
        views: {
          'all': {
            templateUrl: 'templates/pedidos/index.html',
            controller:  'PedidosIndex'            
          }
        }     
      })

      .state('pedidos.opened', {
        url: '/opened',
        views: {
          'opened': {
            templateUrl: 'templates/pedidos/index.html',
            controller:  'PedidosIndex'            
          }
        }     
      })

      .state('pedidos.closed', {
        url: '/closed',
        views: {
          'closed': {
            templateUrl: 'templates/pedidos/index.html',
            controller:  'PedidosIndex'            
          }
        }     
      })

      // show

      .state('pedidos.show-all', {
        url: '/all/:id',
        views: {
          'all': {
            templateUrl: 'templates/pedidos/show.html',
            controller:  'PedidosShow'            
          }
        }     
      })

      .state('pedidos.show-closed', {
        url: '/closed/:id',
        views: {
          'closed': {
            templateUrl: 'templates/pedidos/show.html',
            controller:  'PedidosShow'            
          }
        }     
      })

      .state('pedidos.show-opened', {
        url: '/opened/:id',
        views: {
          'opened': {
            templateUrl: 'templates/pedidos/show.html',
            controller:  'PedidosShow'            
          }
        }     
      })

      ;

    $urlRouterProvider.otherwise('/pedidos/all');
  
  }); 


});