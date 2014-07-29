function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function() {
	
	var PedidoOracao = Parse.Object.extend("Oracao");
	var user = Parse.User.current();	
	$("#nome").val(user.get("name"));
	
	var oracaoId = getParameterByName('oracaoId');
	console.log(oracaoId);
	if(oracaoId){
		$('#pedidobtn').hide();

		var query = new Parse.Query(PedidoOracao);
		query.get(oracaoId,{
			success: function(oracao) {
				console.log(oracao.get("user"));
				$("#nome").val(oracao.get("nome"));
				$("#pedido").val(oracao.get("texto"));
				$("#resposta").val(oracao.get("resposta"));
				
				if(oracao.get("user").id != user.id){
					$("#nome").attr('readonly',true);
					$("#pedido").attr('readonly',true);
					$("#resposta").attr('readonly',true);
					$('#respostabtn').hide();					
				}
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	}else{
		$('#respostabtn').hide();
	}	


	$('#pedidobtn').on('click', function (e) {
		e.preventDefault();

		var pedido = $("#pedido").val();
		var nome = $("#nome").val();
		
		var oracao = new PedidoOracao();
			oracao.set("nome", nome);
			oracao.set("texto", pedido);
			oracao.set("user", user);

			oracao.save(null, {
			  success: function(oracao) {
			    // Execute any logic that should take place after the object is saved.
			    //alert('Pedido criado! ');
			    document.location = 'home.html';
			  },
			  error: function(oracao, error) {
			    // Execute any logic that should take place if the save fails.
			    // error is a Parse.Error with an error code and description.
			    alert('Erro ao criar o pedido: ' + error.message);
			  }
			});
		});


	$('#respostabtn').on('click', function (e) {
		e.preventDefault();

		
		var pedido = $("#pedido").val();
		var nome = $("#nome").val();
		var resposta = $("#resposta").val();
		
		var oracao = new PedidoOracao();
			oracao.id = oracaoId;
			oracao.set("nome", nome);
			oracao.set("texto", pedido);
			oracao.set("user", user);
			oracao.set("resposta", resposta);
			oracao.save(null, {
			  success: function(oracao) {
			    // Execute any logic that should take place after the object is saved.
			    //alert('Pedido fechado! ');
			    document.location = 'home.html';
			  },
			  error: function(oracao, error) {
			    // Execute any logic that should take place if the save fails.
			    // error is a Parse.Error with an error code and description.
			    alert('Erro ao criar o pedido: ' + error.message);
			  }
			});
	});

	$('#backbtn').on('click', function (e) {
		e.preventDefault();
		history.back();
	});


	$("#formPedido").validate({
		rules: {
			nome: {
				required: true
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