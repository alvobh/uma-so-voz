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
        controller:  'PedidosAll'
      })

      .state('pedidos.mine', {
        url: '/mine',
        templateUrl: 'templates/pedidos/index.html',
        controller:  'PedidosMine'
      })

      .state('pedidos.opened', {
        url: '/mine',
        templateUrl: 'templates/pedidos/index.html',
        controller:  'PedidosOpened'
      })

      .state('pedidos.closed', {
        url: '/mine',
        templateUrl: 'templates/pedidos/index.html',
        controller:  'PedidosOpened'
      })

      .state('pedidos.show', {
        url: '/:id',
        templateUrl: 'templates/pedidos/show.html',
        controller:  'PedidosShow'
      })


    $urlRouterProvider.otherwise('/pedidos/all');
  
  }); 


});