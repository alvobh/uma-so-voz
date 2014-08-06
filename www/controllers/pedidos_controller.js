define(['application', '../services/pedido'], function(app) {

  var list = function($scope, $state, $ionicSideMenuDelegate, Pedido) {

    $scope.refresh = function() {
      var filter = $state.current.name.split('.')[1];
        console.log("====" + filter);
      Pedido[filter](function(pedidos) {
        $scope.pedidos = pedidos;
        $scope.$apply();
      });
    }

    $scope.pedido = {}
    $scope.cria = function(pedido) {
      var p = new Pedido(pedido);
      p.save(null, {
        success: function() {
          $scope.alert   = 'Pedido criado com sucesso!';
          $scope.pedido  = {}
          $scope.pedidos = [p] + $scope.pedidos;
          $ionicSideMenuDelegate.toggleRight();
        }
      });
    }

    $scope.refresh();
  }

  app.controller('PedidosIndex', list)
  .controller('PedidosOpened', list)
  .controller('PedidosClosed', list)

  .controller('PedidosShow', function($scope, $stateParams, Pedido) {
    console.log($stateParams.id);
    Pedido.get($stateParams.id, function(pedido) {
      $scope.pedido = pedido;
      $scope.$apply();
    })
  });
  
});
  