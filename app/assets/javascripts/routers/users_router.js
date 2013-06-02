Eduki.Routers.Users = Backbone.Router.extend({
  routes: {
    'dashboard(/)': 'dashboard',
    'user/update(/)': 'update',
    'user/premium(/)': 'premium',
  },

  dashboard: function() {
    var view = new Eduki.Views.Dashboard;
    $('#main-content').html(view.render().el);
  },

  update: function() {
  	var view = new Eduki.Views.UpdateProfile;
  	$('#main-content').html(view.render().el);
  },

  premium: function() {
  	var view = new Eduki.Views.Premium;
  	$('#main-content').html(view.render().el);
  }
});
