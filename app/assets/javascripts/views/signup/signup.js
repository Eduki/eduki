Eduki.Views.SignUp = Backbone.View.extend({
	
	template: JST['signup/signup'],

	initialize: function() {
		this.render(this.template());
	},

	render: function(template) {
		$(this.el).html(template);
    return this;
	}

});