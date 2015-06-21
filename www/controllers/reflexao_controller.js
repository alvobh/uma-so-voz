define(['application' ], function(app, LocalCache) {

  url = "http://www.outrasfronteiras.com.br/blog/feed/";
  app
  .controller("ReflexaoIndex", ['$scope','FeedService', function ($scope,Feed) {    
    $scope.title  = 'Reflexão'
           
    Feed.parseFeed($scope.feedSrc).then(function(res){
        $scope.feeds=res.data.responseData.feed.entries;         
    });
}])


.controller("ReflexaoShow", ['$scope','$stateParams', function ($scope,$stateParams) {    
    $scope.title  = 'Reflexão';
    $scope.titulo = $stateParams.titulo;
    $scope.texto = $stateParams.texto;
    $scope.autor = $stateParams.autor;
    $scope.publishDate = $stateParams.date;
}])
;

app.factory('FeedService',['$http',function($http){
    return {
      parseFeed : function(){
        return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=JSON_CALLBACK&q=http%3A%2F%2Fwww.outrasfronteiras.com.br%2Fblog%2Ffeed%2F');
        } 
    }

    return{
      findFeed: function(url){
        return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/find?v=1.0&num=10&callback=JSON_CALLBACK&q='+encodeURI(url)); 
      }
    }
}]);

app.filter('htmlToPlaintext', function() {
    return function(text) {
      return String(text).replace(/<[^>]+>/gm, '').replace(/"/gm, '').replace(/#/gm, '').replace('YARPP powered by AdBistroPowered by','');
    };
  }
);

});