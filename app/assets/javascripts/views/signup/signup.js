/*
 * Signup Page View
 *
 * Takes new user information, validates it, and submits it to the server
 * Displays appropriate success/error page on completion
 *
 * author: Michael
 */

Eduki.Views.SignupIndex = Backbone.View.extend({
	
	template: JST['users/signup'],
	successTemplate: JST['users/signup_success'],
	errorTemplate: JST['static/error'],

	events: {
		'submit form' : 'signup'
	},

	initialize: function() {
		this.render(this.template());
	},

	render: function(template) {
		$(this.el).html(template);
    return this;
	},

	 // handles the form submission, displays appropriate pages on success/error
  signup: function(e) {
    e.preventDefault();
    this.user = new Eduki.Models.User({ email: $('#signup-field-email').val(), 
                                            password: $('#signup-field-password').val() });

		var self = this;

    // performs basic email validation
    if (!this.user.isValid()) {
  		alert(this.user.validationError);
  		this.render(this.errorTemplate());
  		return;
		}

    $.when(this.user.save()).then(
            function() { self.render(self.successTemplate()); },
            function() { self.render(self.errorTemplate()); }
          );
  }
});