Eduki.Routers.Users = Backbone.Router.extend({
  routes: {
    'dashboard(/)': 'dashboard',
  },

  dashboard: function() {
    var view = new Eduki.Views.Dashboard
    $('#main-content').html(view.render().el);
  }
});
