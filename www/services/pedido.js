define(['application', '../services/parse'], function(app) {
  
  var Pedido =  function() {

    var dao   = Parse.Object.extend("Oracao");
    var query = new Parse.Query(dao);

    dao.all = function(callback) {
      query.find({ success: callback });
    }

    // basic methods

    dao.find = function(callback) {
      query.find(callback)
    }

    dao.get = function(id, callback) {
      query.get(id, callback)
    }

    // abstract
      
    dao.by_user = function() {
      query.equalTo("user",   user);
    }

    dao.not_deleted = function() {
      query.equalTo("delete", false);
    }

    dao.opened = function() {
      query.equalTo("resposta", null);
    }

    return dao;
  }

  app.factory('Pedido', Pedido);
  return Pedido;

})
