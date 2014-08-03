	$("#formlogin").validate({
		rules: {
			username: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 6
			}
		},
		messages: {
			username: {
				required: "Informe seu email",
                email: "Informe um email válido"
			},
			password: {
				required: "Informe sua senha",
                minlength: $.validator.format("Pelo menos {0} caracteres.")
			}
		}
    });
