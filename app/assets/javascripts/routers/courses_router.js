Eduki.Routers.Courses = Backbone.Router.extend({
  routes: {
    'courses': 'index',
  },

  index: function() {
    var view = new Eduki.Views.CoursesIndex();
    $("#container").html(view.render().el);
  },
});
