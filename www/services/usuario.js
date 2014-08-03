define(['application', '../services/parse'], function(app) {
  
  var Usuario =  function() {

    var dao   = Parse.User;
      
    dao.login = function(user, pass, cb) {
      dao.logIn(user, pass, { success: cb });
    }

    return dao;
  }

  app.factory('Usuario', Usuario);
  return Usuario;

})
