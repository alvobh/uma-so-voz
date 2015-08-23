define(['application', 'libs/query_wrapper'], function(app, QueryWrapper) {

  var Atualizacao = Parse.Object.extend("Atualizacao");

  QueryWrapper.wrap(Atualizacao, {

    all: function(callback) {
      this.descending('updatedAt').find({ success: callback });
    }

  });

  app.factory('Atualizacao', function() {
    return Atualizacao;
  });

  return Atualizacao;
})
