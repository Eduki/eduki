/*
 * User model
 *
 * author: Michael
 */
 
Eduki.Models.User = Backbone.Model.extend({
	urlRoot: '/api/users/',

	// basic email validation. Checks to see if there is only 1 @ symbol, 
	// and if it is not the first character in the email. Also checks to 
	// see if there is a '.' followed by at least one character
	validate: function(attrs, options) {
    var pattern = /.+@{1}.+\..+/;
		if (!pattern.test(attrs.email)) {
			return new Array('email', 'Please provide a valid email address');
		} else if (attrs.password == "") {
			return new Array('password', 'Please provde a password');
    }
	}
});
