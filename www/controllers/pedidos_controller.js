define(['application', '../services/pedido'], function(app) {

  app

  .controller('PedidosNew', function($scope, $rootScope, $ionicSideMenuDelegate) {

    $scope.pedido = {};
    $scope.cria = function(pedido) {
      var p = new Pedido(pedido);
      p.save(null, {
        success: function() {
          $scope.pedido  = {};
          $rootScope.$emit('pedidos.new', p);
          $ionicSideMenuDelegate.toggleRight();
        }
      });
    }

  })

  .controller('PedidosIndex', function($scope, $rootScope, $state, Pedido) {

    $scope.pedidos = [];
    $scope.qtd     = 10;
    $scope.page    = 0;
    $scope.filter  = $state.current.name.split('.')[1];

    $scope.remove_alert = function() {      
      $scope.alert = '';
      $scope.$apply();
    }

    $rootScope.$on('pedidos.new', function(event, pedido) {
      $scope.alert   = 'Pedido criado com sucesso!';
      $scope.pedidos = [pedido].concat($scope.pedidos);
      $scope.$apply();
      setTimeout($scope.remove_alert, 3000);
    })

    $scope.load_pedidos = function(page) {
      $rootScope.loading = true;
      Pedido.paginate($scope.qtd, page)[$scope.filter](function(pedidos) {
        $rootScope.loading = false;
        $scope.page    = page + 1;
        $scope.pedidos = $scope.pedidos.concat(pedidos);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$apply();
      });
    }

    $scope.load_pedidos($scope.page);
    
  })

  .controller('PedidosShow', function($scope, $rootScope, $stateParams) {
    $scope.filter = $stateParams.filter;
    $rootScope.loading = true;
    Pedido.get($stateParams.id, function(pedido) {
      $scope.pedido = pedido;
      $rootScope.loading = false;
      $scope.$apply();
    })
  });
  
});
  