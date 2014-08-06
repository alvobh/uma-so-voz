define(['application', '../services/parse'], function(app) {
  
  var Pedido =  function() {

    var dao   = Parse.Object.extend("Oracao");
    var query = new Parse.Query(dao);

    dao.all = function(callback) {
      query.descending('updatedAt').find({ success: callback });
      query = new Parse.Query(dao);
    }

    dao.get = function(id, callback) {
      query.get(id, { success: callback, error: callback });
      query = new Parse.Query(dao);
    }

    // getters

    var getters = {};

    getters.by_user = function() {
      query.equalTo("user",   user);
    }

    getters.not_deleted = function() {
      query.equalTo("delete", false);
    }

    getters.opened = function() {
      query.equalTo("resposta", null);
    }

    getters.closed = function() {
      query.notEqualTo("resposta", null);
    }

    for(var getter in getters) { 
      dao[getter] = function() {
        var query = getter;
        return function(callback) {
          getters[query]();
          if(callback) dao.all(callback)
          else return dao;
        }
      }();
    }

    return dao;
  }

  app.factory('Pedido', Pedido);
  return Pedido;

})
