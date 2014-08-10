define(['application', 'libs/query_wrapper', 'libs/query_cache', 'services/atualizacao'], function(app, QueryWrapper, QueryCache, Atualizacao) {

  var Pedido = Parse.Object.extend("Oracao", {

    prettyName: function() {
      return this.get('nome').split(' ').slice(0, 2).join(' ');
    },

    status: function() {
      return this.get('fechado') == true ? 'closed' : 'opened';
    },

    getAtualizacoes: function(cb) {
      this.relation("atualizacoes").query().find({ success: cb }, { error: cb });
    },

    addAtualizacao: function(atualizacao) {
      this.relation('atualizacoes').add(atualizacao);
      this.set('fechado', atualizacao.get('fecha_pedido'));
      this.save();
    }

  });

  // sync


  Pedido.create = function(attrs, callback) {
    attrs.user_uuid = ionic.Platform.device().uuid;
    var object = new Pedido(attrs);
    object.save(null, {
      error: callback,
      success: function(pedido) {
        Pedido.cache.insert(pedido);
        callback(object);
      }
    });   
  }

  // remote queries

  QueryWrapper.wrap(Pedido, {

    all: function(callback) {
      this.descending('updatedAt').find({ success: callback });
    },

    since: function(since) {
      // this.greaterThan('createdAt', since);
    },

  });


  // cached queries

  QueryCache.wrap(Pedido, Pedido.query.since, {

    closed: function() {
      return this.get('fechado');
    },

    opened: function() {
      return !this.get('fechado');
    },

    mine: function() {
      return this.get('user_uuid') == ionic.Platform.device().uuid;
    }

  });

  // factory

  app.factory('Pedido', function() {
    return Pedido;
  });

  return Pedido;

})
