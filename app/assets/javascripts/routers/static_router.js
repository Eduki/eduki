Eduki.Routers.Static = Backbone.Router.extend({
  routes: {
    '': 'index',
    'login(/)': 'login'
  },

  index: function() {
    // Delegate to the StaticIndex View and render it inside of the container
    var view = new Eduki.Views.StaticIndex();
    $('#main-content').html(view.render().el);
  },

  login: function() {
    var view = new Eduki.Views.Login();
    $('#main-content').html(view.render().el);
  }
});
