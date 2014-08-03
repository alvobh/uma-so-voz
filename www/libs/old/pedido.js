
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
