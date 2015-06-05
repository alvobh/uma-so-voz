define(['application' ], function(app, LocalCache) {

  url = "http://www.outrasfronteiras.com.br/blog/feed/";
  app
  .controller("ReflexaoIndex", ['$scope','FeedService', function ($scope,Feed) {    
    $scope.title  = 'Reflexão'
            
      Feed.parseFeed($scope.feedSrc).then(function(res){
          //$scope.loadButonText=angular.element(e.target).text();
        $scope.feeds=res.data.responseData.feed.entries;
                
    });

    $scope.load_reflexao = function(title) {  
      $rootScope.showLoading();

      var query = 'site:'+url+' '+title;
      Feed.findFeeds(query, function(result){
          
      });


      Pedido.fetch(function(pedidos) {
        $rootScope.hideLoading();
        $scope.update_pedidos();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$apply();
      });
    }
    
}])

.controller("ReflexaoTexto",function(){
  $scope.title = "Reflexão";



});

app.factory('FeedService',['$http',function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=http%3A%2F%2Fwww.outrasfronteiras.com.br%2Fblog%2Ffeed%2F');
        }
    }
}]);
  
});