$(document).ready(function() {

	$('#loginbtn').on('click', function (e) {
		e.preventDefault();

		var username = $("#username").val();
		var password = $("#password").val();

		Parse.User.logIn(username, password, {
		  success: function(user) {
			  document.location = "index.html";
		  },
		  error: function(user, error) {
		    // The login failed. Check error to see why.
			alert("Error: " + error.code + " " + error.message);
		  }
		});
	});

	$('#signupbtn').on('click', function (e) {
		e.preventDefault();
		document.location = "signup.html";
	});

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

});