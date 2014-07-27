$(document).ready(function() {

	$('#cancelarbtn').on('click', function (e) {
        e.preventDefault();
        document.location = "login.html"
    });

    $('#submitbtn').on('click', function (e) {
        e.preventDefault();

        if ($("#formregistration").valid()) {
			var user = new Parse.User();
			user.set("name", $("#usernameforreg").val());
			user.set("username", $("#useremail").val());
			user.set("email", $("#useremail").val());
			user.set("password", $("#passwordforreg").val());

			user.signUp(null, {
			  success: function(user) {
				console.log(user);
				document.location = "index.html"
			  },
			  error: function(user, error) {
				// Show the error message somewhere and let the user try again.
				alert("Error: " + error.code + " " + error.message);
			  }
			});
		} else {
			alert("Dados do formulário inválidos. Favor corrigir.");
		}
    });

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

});