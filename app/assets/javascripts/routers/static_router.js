Eduki.Routers.Static = Backbone.Router.extend({
  routes: {
    '': 'index',
    'about(/)': 'about',
    'error(/)': 'error',
  },

  index: function() {
    // Delegate to the StaticIndex View and render it inside of the container
    var view = new Eduki.Views.StaticIndex();
    $('#main-content').html(view.render().el);
  },

  about: function() {
    var view = new Eduki.Views.About();
    $('#main-content').html(view.render().el);
  },

  error: function() {
    var view = new Eduki.Views.ErrorPage();
    $('#main-content').html(view.render().el);
  }
});
