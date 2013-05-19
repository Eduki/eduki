/*
 * Signup Page View
 *
 * Takes new user information, validates it, and submits it to the server
 * Displays appropriate success/error page on completion
 *
 * author: Michael
 */

Eduki.Views.Signup = Backbone.View.extend({
	
	template: JST['static/signup'],
	successTemplate: JST['static/signup_success'],
	invalidTemplate: JST['static/invalid_inline'],
	errorTemplate: JST['static/error'],

	events: {
		'submit form' : 'signup'
	},

	initialize: function() {
		this.render(this.template());
	},

  // If a user is already logged in, they shouldn't see the sign up page
	render: function(template) {
    if (currentUser.authenticated) {
      router.route("/dashboard");
      return false;
    } else {
      $(this.el).html(template);
      return this;
    }
	},

	 // handles the form submission, displays appropriate pages on success/error
  signup: function(e) {
    e.preventDefault();
    this.user = new Eduki.Models.User({ email: $('#signup-field-email').val(),
                                        password: $('#signup-field-password').val() });

		var self = this;

    // performs basic email validation
    // will alert user if email improperly filled out
    if (this.user.isValid()) {
      this.user.save({email: this.user.get('email')},
                     {wait: true,
                      success: function() { self.render(self.successTemplate()); },
                      error: function(model, xhr, options) {
                        if (xhr.status == 409)
                          self.invalid('Email already exists');
                        else
                          self.render(self.errorTemplate());
                      }});
		} else {
      this.invalid(this.user.validationError);
    }

  },

  invalid: function(message) {
    this.errorMessage = message;
    if ($('.alert').length <= 0) {
      $('#signup-field-email').after(this.invalidTemplate());
      $('.alert').delay(1000).fadeOut(function() {
        $('.alert').remove();
      });
    }
  }
});
