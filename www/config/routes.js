define([

  'application',
  '../controllers/pedidos_controller',
  '../controllers/application_controller'

], function(app) { 

  app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('pedidos', {
        url: "/pedidos/:filter",
        controller:  'PedidosIndex',
        templateUrl: "templates/pedidos/index.html"
      })

      // show

      .state('pedidos-show', {
        url: '/pedidos/show/:id',
        templateUrl: 'templates/pedidos/show.html',
        controller:  'PedidosShow'
      })

      ;

    $urlRouterProvider.otherwise('/pedidos/all');
  
  }); 


});