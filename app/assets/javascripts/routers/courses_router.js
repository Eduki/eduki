Eduki.Routers.Courses = Backbone.Router.extend({
  routes: {
    '': 'index',
    'courses/:id': 'show'
  },

  index: function() {
    var view = new Eduki.Views.CoursesIndex()
    $("#container").html(view.render().el);
  },

  show: function(id) {
    alert("course viewing page for " + id);
  }
});
