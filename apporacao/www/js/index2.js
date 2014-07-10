$(document).ready(function() {

	var user = Parse.User.current();

	if (user == null) {
		document.location = "login.html";
	} else {
		document.location = "home.html";
	}

});