
$('#pedidobtn').on('click', function (e) {
		e.preventDefault();

		var pedido = $("#pedido").val();
		var PedidoOracao = Parse.Object.extend("Oracao");
		var oracao = new PedidoOracao();
		

			oracao.set("nome", username.nome);
			oracao.set("texto", pedido);
			oracao.save(null, {
			  success: function(oracao) {
			    // Execute any logic that should take place after the object is saved.
			    alert('Pedido criado: '+ username.name+'--' + pedido);
			  },
			  error: function(oracao, error) {
			    // Execute any logic that should take place if the save fails.
			    // error is a Parse.Error with an error code and description.
			    alert('Erro ao criar o pedido: ' + error.message);
			  }
			});
	});



$(document).ready(function() {

	var username = Parse.User.current();
	$("#username").val(username.name);
	$('#username').attr('readonly', true);
	
	
	$("#formPedido").validate({
		rules: {
			username: {
				required: true,
				email: true
			},
			pedido: {
				required: true,
				minlength: 10
			}
		},
		messages: {
			pedido: {
				required: "Informe seu pedido",
                minlength: $.validator.format("Pelo menos {0} caracteres.")
			}
		}
    });
});