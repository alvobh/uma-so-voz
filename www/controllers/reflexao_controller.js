define(['application',  'services/reflexao'], function(app, LocalCache) {

  app

  .controller('ReflexaoIndex', function($scope, $rootScope, $ionicSideMenuDelegate) {
	$scope.title  = 'Pedidos'


    $scope.load_posts = function(pedidos, page) {    
        $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "q": "http://www.outrasfronteiras.com.br/blog/feed/" } })
            .success(function(data) {
                $scope.rssTitle = data.responseData.feed.title;
                $scope.rssUrl = data.responseData.feed.feedUrl;
                $scope.rssSiteUrl = data.responseData.feed.link;
                $scope.entries = data.responseData.feed.entries;
                window.localStorage["entries"] = JSON.stringify(data.responseData.feed.entries);
            })
            .error(function(data) {
                console.log("ERROR: " + data);
                if(window.localStorage["entries"] !== undefined) {
                    $scope.entries = JSON.parse(window.localStorage["entries"]);
                }
            });
    }
    
  })
