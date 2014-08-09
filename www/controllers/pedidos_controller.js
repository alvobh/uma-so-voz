define(['application', '../services/pedido','../lib/local_cache'], function(app, Pedido, LocalCache) {

  app

  .controller('PedidosNew', function($scope, $rootScope, $ionicSideMenuDelegate, Pedido) {

    $scope.pedido = {};
    $scope.cria = function(pedido) {
      var p = new Pedido(pedido);
      p.save(null, {
        success: function() {
          $scope.pedido  = {};
          $rootScope.$emit('pedidos.new', p);
          saveLocal(p);
          $ionicSideMenuDelegate.toggleRight();

        }
      });

      function saveLocal(p){
        var pedido = LocalCache.get('pedido','meus');
          if(pedido === null){
            pedido = new Array();
          }
          pedido.push(p.id);
          LocalCache.save('pedido','meus',pedido);
      }   
    }
    $scope.removePedido = function(pedido) {
      var p = new Pedido(pedido);
      p.save(null, {
        success: function() {
          $scope.pedido  = {};
          $rootScope.$emit('pedidos.new', p);
          saveLocal(p);
          $ionicSideMenuDelegate.toggleRight();

        }
      });   
    }
  })

  .controller('PedidosIndex', function($scope, $rootScope, $stateParams, Pedido) {

    $scope.pedidos = [];
    $scope.qtd     = 10;
    $scope.page    = 0;

    $scope.filter  = new function() {
      var status = $stateParams.filter, that = this;

      this.check = function(value) {
        return status == value;
      }

      this.item = function(item) {
        return that.check(undefined) || that.check('all') || that.check(item.status());
      }

      this.update = function(value) {
        if(that.check(value)) status = undefined;
        else status = value;
      }
    }();

    $rootScope.$on('pedidos.new', function(event, pedido) {
      // $scope.alert   = 'Pedido criado com sucesso!'; TODO criar alerta com phonegap
      // setTimeout($scope.remove_alert, 3000);
      $scope.pedidos = [pedido].concat($scope.pedidos);

      $scope.$apply();
    })

    $scope.load_pedidos = function(page) {
      $rootScope.loading = true;      // [$scope.filter]
      Pedido.paginate($scope.qtd, page).all(function(pedidos) {
        $rootScope.loading = false;
        $scope.page    = page;
        $scope.pedidos = $scope.pedidos.concat(pedidos);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$apply();
      });
    }

    $scope.load_pedidos($scope.page);
    
  })

  .controller('PedidosShow', function($scope, $rootScope, $stateParams, Pedido) {
    $scope.filter = $stateParams.filter;
    $rootScope.loading = true;
    window.Pedido = Pedido;
    Pedido.get($stateParams.id, function(pedido) {
      $scope.pedido = pedido;
      $scope.pedido.meu = verificaMeusPedidos(pedido);

      $rootScope.loading = false;
      $scope.$apply();
    })

  });

  function verificaMeusPedidos(pedido){
    var meuPedido = LocalCache.get('pedido','meus').indexOf(pedido.id);
    return meuPedido != -1;
  }

});  