    $("#formregistration").validate({
        rules: {
            usernameforreg: {
                required: true,
                maxlength: 50
            },
            useremail: {
                required: true,
                email: true
            },
            passwordforreg: {
                required: true,
                minlength: 6
            },
            retypepasswordforreg: {
                required: true,
                equalTo: "#passwordforreg"
            }
        },
        messages: {
            usernameforreg: {
                required: "Informe seu nome",
                maxlength: $.validator.format("Máximo {0} caracteres.")
            },
            useremail: {
                required: "Informe seu email",
                email: "Informe um email válido"
            },
            passwordforreg: {
                required: "Informe sua senha",
                minlength: $.validator.format("Pelo menos {0} caracteres.")
            },
            retypepasswordforreg: {
                required: "Confirme sua senha",
                equalTo: "Ambas senhas devem ser iguais"
            }
        }
    });
