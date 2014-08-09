define(['application', '../lib/query_wrapper'], function(app, QueryWrapper) {

  var Atualizacao = Parse.Object.extend("Atualizacao");

  QueryWrapper.wrap(Atualizacao, {

    all: function(callback) {
      this.descending('updatedAt').find({ success: callback });
    },

    do_pedido: function(id) {
      this.equalTo("pedido", id);
    }

  });

  app.factory('Atualizacao', function() {
    return Atualizacao;
  });

  return Atualizacao;
})
