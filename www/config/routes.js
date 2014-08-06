define([

  'application',
  '../controllers/pedidos_controller',
  '../controllers/application_controller'

], function(app) { 

  return app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('pedidos', {
        url: "/pedidos",
        abstract: true,
        templateUrl: "templates/pedidos/tabs.html"
      })

      .state('pedidos.all', {
        url: '/all',
        templateUrl: 'templates/pedidos/index.html',
        controller:  'PedidosIndex'
      })

      .state('pedidos.opened', {
        url: '/opened',
        templateUrl: 'templates/pedidos/index.html',
        controller:  'PedidosOpened'
      })

      .state('pedidos.closed', {
        url: '/closed',
        templateUrl: 'templates/pedidos/index.html',
        controller:  'PedidosClosed'
      })

      .state('pedidos.show', {
        url: '/show/:id',
        templateUrl: 'templates/pedidos/show.html',
        controller:  'PedidosShow'
      })


    $urlRouterProvider.otherwise('/pedidos/error');
  
  }); 


});