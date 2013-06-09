/*
 * User model
 *
 * author: Michael
 */
 
Eduki.Models.User = Backbone.Model.extend({
	urlRoot: '/api/users/',

  // basic email validation and password validation. Checks to see if there is
  // only 1 @ symbol, and if it is not the first character in the email. Also
  // checks to see if there is a '.' followed by at least one character.
	validate: function(attrs, options) {
    var pattern = /.+@{1}.+\..+/;
		if (!pattern.test(attrs.email)) {
			return new Array('email', 'Please provide a valid email address');
		} else if (attrs.password == "") {
			return new Array('password', 'Please provide a password');
    } else if (attrs.confirm_password !== undefined &&
               attrs.password !== attrs.confirm_password) {
      return ['confirm-password', 'Confirmation password doesn\'t match'];
    }
	}
});
