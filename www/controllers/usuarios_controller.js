define(['application', 'services/usuario'], function(app) {

  app.controller('UsuariosHome', function($scope, Pedido) {
    var user = Parse.User.current();
    if(user == null) ; // do stuff
    else ; // do stuff
  })

  
});
  