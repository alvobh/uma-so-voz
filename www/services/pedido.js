define(['application', 'libs/query_wrapper', 'libs/cache_wrapper', 'services/atualizacao'], function(app, QueryWrapper, CacheWrapper, Atualizacao) {

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

  // interface

  Pedido.all = function(force, callback) {
    var pedidos = Pedido.cache.all();
    if(force || pedidos.length == 0) {
      Pedido.query.all(function(pedidos) {
        Pedido.cache.insert(pedidos);
        callback(pedidos);
      });
    } else {
      callback(pedidos);
    }
  }

  Pedido.get = function(id, callback) {
    var pedido = Pedido.cache.get(id);
    if(pedido) callback(pedido);
    else Pedido.query.get(id, callback);
  }

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

  // connecting the services

  CacheWrapper.wrap(Pedido, 'pedidos', { 
    
    mine: function() {
      return ionic.Platform.device().uuid == this.get('user_uuid');
    },

    opened: function() {
      console.log(!this.get('fechado'));
      return !this.get('fechado');
    },

    closed: function() {
      return this.get('fechado');
    }

  }, function() {


  });

  QueryWrapper.wrap(Pedido, {

    all: function(callback) {
      this.descending('updatedAt').find({ success: callback });
    },

    my:function(meus){
      this.equalTo("id",meus);
    },

    by_user: function() {
      this.equalTo("user",   user);
    },

    not_deleted: function() {
      this.equalTo("delete", false);
    },

  });

  app.factory('Pedido', function() {
    return Pedido;
  });

  return Pedido;

})
