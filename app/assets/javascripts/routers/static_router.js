Eduki.Routers.Static = Backbone.Router.extend({
  routes: {
    '': 'index',
  },

  index: function() {
    // Delegate to the CoursesIndex View and render it inside of the container
    var view = new Eduki.Views.StaticIndex();
    $('#main-content').html(view.render().el);
  },
});
