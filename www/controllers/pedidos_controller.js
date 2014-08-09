define(['application', 'libs/local_cache', 'services/pedido'], function(app, LocalCache) {

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

  .controller('PedidosIndex', function($scope, $rootScope, $stateParams, $ionicPopover, Pedido) {

    $scope.pedidos = [];
    $scope.qtd     = 10;
    $scope.page    = 0;
    $scope.tem_mais_pedidos = false;

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
    });


    $scope.load_pedidos = function(page) {      
      $rootScope.showLoading();
      Pedido.paginate($scope.qtd, page)[$stateParams.filter](function(pedidos) {
        if(pedidos.length == 0) $scope.tem_mais_pedidos = false;
        $rootScope.hideLoading();
        $scope.page    = page;
        $scope.pedidos = $scope.pedidos.concat(pedidos);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$apply();
      });
    }

    $scope.load_pedidos($scope.page);
    
  })

  .controller('PedidosShow', function($scope, $rootScope, $stateParams, Pedido, Atualizacao) {
    $scope.atualizacoes = [];
    $rootScope.showLoading();

    $scope.resetAtualizacao = function() {
      $scope.criando_atualizacao = false;
      $scope.atualizacao         = { texto: null, fecha_pedido: false };
    }

    $scope.comecaAtualizacao = function() {
      if(!$scope.criando_atualizacao)
        $scope.criando_atualizacao = true;
    }

    $scope.addAtualizacao = function(attrs) {
      if(attrs.texto) {
        $scope.status_atualizacao = 3;
        $rootScope.showLoading();
        var a = new Atualizacao(attrs);
        a.save(null, {
          success: function(atualizacao) {
            $scope.resetAtualizacao();
            $scope.pedido.addAtualizacao(atualizacao);
            $scope.loadAtualizacoes([atualizacao].concat($scope.atualizacoes));
          }
        })
      }
    }

    $scope.loadAtualizacoes = function(atualizacoes) {
      $scope.atualizacoes = atualizacoes;
      $rootScope.hideLoading();
      $scope.$apply();
    }
    
    Pedido.get($stateParams.id, function(pedido) {
      $scope.pedido = pedido;
      $scope.pedido.meu = verificaMeusPedidos(pedido);
      $scope.pedido.getAtualizacoes($scope.loadAtualizacoes);
      $scope.$apply();
    })

    $scope.resetAtualizacao();
  });

  function verificaMeusPedidos(pedido){
    var meuPedido = (LocalCache.get('pedido','meus') || []).indexOf(pedido.id);
    return meuPedido != -1;
  }

});  
