define(['application', 'libs/local_cache', 'services/pedido'], function(app, LocalCache) {

  app

  .controller('PedidosNew', function($scope, $rootScope, $ionicSideMenuDelegate, Pedido) {

    $scope.pedido = {};
    $scope.cria = function(attrs) {
      Pedido.create(attrs, function(pedido, errors) {
        $scope.pedido = {};
        $rootScope.$emit('pedidos.new', pedido);
        $ionicSideMenuDelegate.toggleRight();
      });
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
        if(that.check(value)) {
          status = undefined;
          $scope.pedidos = $scope.all
        } else {          
          status = value;
          $scope.pedidos = $scope[value];
        }
      }
    }();

    $rootScope.$on('pedidos.new', function(event, pedido) {
      // $scope.alert   = 'Pedido criado com sucesso!'; TODO criar alerta com phonegap
      // setTimeout($scope.remove_alert, 3000);
      $scope.pedidos = [pedido].concat($scope.pedidos);
      $scope.$apply();
    });

    $scope.update_scroll = function(pedidos, page) {    
      if(pedidos.length == 0) $scope.tem_mais_pedidos = false;  
      $scope.page    = page;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    $scope.load_pedidos = function(page) {      
      $rootScope.showLoading();
      Pedido.fetch(function(pedidos) {
        $rootScope.hideLoading();
        $scope.pedidos = $scope.all = pedidos;
        $scope.opened  = Pedido.cache.opened();
        $scope.closed  = Pedido.cache.closed(); 
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
    
    Pedido.cache.get($stateParams.id, function(pedido) {
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
