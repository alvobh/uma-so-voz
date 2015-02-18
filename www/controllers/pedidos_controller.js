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
  })

  .controller('PedidosIndex', function($scope, $rootScope, $stateParams, $ionicScrollDelegate, $ionicLoading, $ionicPlatform, Pedido) {
    $scope.title  = 'Pedidos'
    if($stateParams.filter == 'mine') $scope.title = 'Meus ' + $scope.title;

    $scope.qtd    = 10;
    $scope.page   = 0;
    $scope.filter = 'opened';
    $scope.tem_mais_pedidos = false;


    // console.log(ionic.Platform);

    $scope.update_scroll = function(pedidos, page) {    
      if(pedidos.length == 0) $scope.tem_mais_pedidos = false;  
      $scope.page    = page;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    $scope.update_pedidos = function(new_filter) {
      if(new_filter) $scope.update_filter(new_filter);
      $scope.pedidos = Pedido.cache[$stateParams.filter]().filter($scope.filter);
      $ionicScrollDelegate.scrollTop();
    }

    $scope.update_filter = function(new_filter) {
      if($scope.filter != new_filter)
        $scope.filter = new_filter;
    }

    $scope.load_pedidos = function() {      
      $rootScope.showLoading();
      Pedido.fetch(function(pedidos) {
        $rootScope.hideLoading();
        $scope.update_pedidos();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$apply();
      });
    }

    $rootScope.$on('pedidos.new', function(event, pedido) {
      $scope.update_pedidos('opened');
      $ionicLoading.show({ template: 'Pedido adicionado!', noBackdrop: true, duration: 2000 });
      $scope.$apply();
    });

    $scope.load_pedidos($scope.page);
    
  })

  .controller('PedidosShow', function($scope, $rootScope, $stateParams, $ionicPopup, Pedido, Atualizacao) {
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
      $scope.pedido.getAtualizacoes($scope.loadAtualizacoes);
      $scope.$apply();
    })

    $scope.deletePedido = function() {
      var confirmPopup = $ionicPopup.confirm({
         title: 'Remover Pedido',
         template: 'Deseja remover este pedido?'
       });
       confirmPopup.then(function(res) {
         if(res) {
           $scope.pedido.destroy();
           history.back();
           $scope.$apply();
         }
       });
    }

    $scope.resetAtualizacao();
  });

});  

