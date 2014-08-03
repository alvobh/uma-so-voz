define(['application', '../services/pedido'], function(app) {

  app.controller('PedidosAll', function($scope, Pedido) {
    $scope.title = "Últimos Pedidos";
    Pedido.all(function(pedidos) {
      $scope.pedidos = pedidos;
      $scope.$apply();
    });
  })

  .controller('PedidosOpened', function($scope) {

  })

  .controller('PedidosShow', function($scope) {

  });
  
});
  