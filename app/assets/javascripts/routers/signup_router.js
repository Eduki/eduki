/*
 * Handles routing with Sign-up page
 *
 * author: Michael
 */

Eduki.Routers.Signup = Backbone.Router.extend({
  routes: {
    'signup(/)': 'index'
  },

  index: function() {
    // Delegate to the SignupIndex View and render it inside of the container
    var view = new Eduki.Views.SignupIndex();
    $('#main-content').html(view.render().el);
  }

});
