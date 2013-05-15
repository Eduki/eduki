/*
 * Handles routing with Sign-up page
 *
 * author: Michael
 */

Eduki.Routers.SignUp = Backbone.Router.extend({
	routes: {
		'signup(/)': 'signup'
	},

	signup: function() {
		// delegate to the SignUp view and render it as the main-content 
		var view = new Eduki.Views.SignUp();
    $('#main-content').html(view.render().el);
	}

});