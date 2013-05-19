/*
 * User model
 *
 * author: Michael
 */
 
Eduki.Models.User = Backbone.Model.extend({
	urlRoot: '/api/users/',

	// basic email validation. Checks to see if there is only 1 @ symbol, and if it is not the
	// first character in the email.
	validate: function(attrs, options) {
    var pattern = /.+@{1}.+\..+/;
		if (!pattern.test(attrs.email)) {
			return 'Please provide a valid email address';
		}
	}
});
