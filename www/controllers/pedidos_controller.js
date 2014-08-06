define(['application', '../services/pedido'], function(app) {

  app

  .controller('PedidosIndex', function($scope, $view, $state, $ionicSideMenuDelegate, Pedido) {

    $scope.filter = $state.current.name.split('.')[1];

    $scope.refresh = function() {
      Pedido[$scope.filter](function(pedidos) {
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
  })

  .controller('PedidosShow', function($scope, $stateParams, Pedido) {
    $scope.filter = $stateParams.filter;
    Pedido.get($stateParams.id, function(pedido) {
      $scope.pedido = pedido;
      $scope.$apply();
    })
  });
  
});
  