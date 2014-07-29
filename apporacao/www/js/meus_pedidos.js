function getRow(oracao) {
	var oracaoId = oracao.id;
	var nome = oracao.get('nome');
	var texto = oracao.get('texto');
	var resposta = oracao.get('resposta');
	if (!resposta) {
		resposta = '';
	}
	var row = '<li><a href="pedido.html?oracaoId='+oracaoId+'">'
	+ '<h2>' + nome + '</h2>'
	+ '<p><strong>Pedido/Necessidade:</strong> ' + texto + '</p>'
	+ '<p><strong>Situa&ccedil;&atilde;o atual/Resposta:</strong> ' + resposta + '</p>'
	+ '</a></li>';
	return row;
}

$(document).ready(function() {
	var user = Parse.User.current();
	$('#addbtn').on('click', function (e) {
		e.preventDefault();
		$(this).load("pedidos.html");
	});

	$('#backbtn').on('click', function (e) {
		e.preventDefault();
		history.back();
	});
	
	var Oracao = Parse.Object.extend("Oracao");
	var query = new Parse.Query(Oracao);
	query.equalTo("user", user);

	query.find({
		success: function(results) {
			for (var i = 0; i < results.length; i++) {
				var content = getRow(results[i]);
				$('#oracoes').append(content);
			}
			$('#oracoes').listview('refresh');
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});


});

