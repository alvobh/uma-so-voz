define(['application', '../lib/query_wrapper'], function(app, QueryWrapper) {

  var Pedido = Parse.Object.extend("Oracao", {

    prettyName: function() {
      return this.get('nome').split(' ').slice(0, 2).join(' ');
    },

    status: function() {
      return this.get('resposta') == null ? 'opened' : 'closed';
    }
  });

  QueryWrapper.wrap(Pedido, {

    all: function(callback) {
      this.descending('updatedAt').find({ success: callback });
    },

    paginate: function(qtd, page) {
      this.limit(qtd).skip(page*qtd);
    },

    by_user: function() {
      this.equalTo("user",   user);
    },

    not_deleted: function() {
      this.equalTo("delete", false);
    },

    opened: function() {
      this.equalTo("resposta", null);
    },

    closed: function() {
      this.notEqualTo("resposta", null);
    }

  });

  app.factory('Pedido', function() {
    return Pedido;
  });

})
