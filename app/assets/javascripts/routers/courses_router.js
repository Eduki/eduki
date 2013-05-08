Eduki.Routers.Courses = Backbone.Router.extend({
  routes: {
    'courses': 'index',
  },

  index: function() {
    // Delegate to the CoursesIndex View and render it inside of the container
    var view = new Eduki.Views.CoursesIndex();
    $('#main-content').html(view.render().el);
  },
});
