Eduki.Views.SignupIndex = Backbone.View.extend({
	
	template: JST['signup/signup'],
	successTemplate: JST['signup/success'],
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
    this.user = new Eduki.Models.User({ username: $('#signup-field-username').val(), 
                                            password: $('#signup-field-password').val() });

    alert('New user: ' + $('#signup-field-username').val() + ' with password: ' 
    			+ $('#signup-field-password').val());

    this.render(this.successTemplate());
    // below code waiting on user api to be complete to test
    /*$.when(this.user.save()).then(
            function() { self.render(self.successTemplate()); },
            function() { self.render(self.errorTemplate()); }
          );*/
  }
});