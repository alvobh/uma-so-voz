define(['application', 'libs/local_cache' ], function(app, LocalCache) {

  url = "http://www.outrasfronteiras.com.br/blog/feed/";
  app
  .controller("ReflexaoIndex", ['$scope','FeedService', function ($scope,Feed) {    
    $scope.title  = 'Reflexão'

    Feed.parseFeed($scope.feedSrc).then(function(res){
        $scope.feeds=res.data.responseData.feed.entries;
        var Reflexao = [];
        for(var i =0; i < $scope.feeds.length; i++){
          var attrs = $scope.feeds[i];
          attrs.id = i;
          var reflexao = {id: i,
                        titulo: attrs.title || "",
                        texto: attrs.content|| "",
                        autor: attrs.author|| "",
                        resumo: attrs.contentSnippet|| "",
                        date: attrs.publishedDate|| "",
                        media: attrs.media|| [],
                        categoria:  attrs.categories|| ""};
         Reflexao.push(reflexao);

        }
        $scope.reflexao = Reflexao;
    });
}])

.controller("ReflexaoShow", ['$scope','$stateParams','FeedService', function ($scope,$stateParams,Feed) {    
    $scope.title  = 'Reflexão';
    var id = $stateParams.id;  
    Feed.parseFeed($scope.feedSrc).then(function(res){
      $scope.titulo = res.data.responseData.feed.entries[id].title;
      $scope.texto = res.data.responseData.feed.entries[id].content;
      $scope.autor = res.data.responseData.feed.entries[id].author;
      $scope.data = res.data.responseData.feed.entries[id].publishedDate;
    });
}])
;

app.factory('FeedService',['$http',function($http){
    return {
      parseFeed : function(){
        return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=JSON_CALLBACK&q=http%3A%2F%2Fwww.outrasfronteiras.com.br%2Fblog%2Ffeed%2F');
        } 
    }
}]);

app.filter('htmlToPlaintext', function() {
    return function(text) {
      return String(text).replace(/<[^>]+>/gm, '').replace(/"/gm, '').replace(/#/gm, '').replace('YARPP powered by AdBistroPowered by','');
    };
  }
);
app.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);
});