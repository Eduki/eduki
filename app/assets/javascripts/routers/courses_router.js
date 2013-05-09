Eduki.Routers.Courses = Backbone.Router.extend({
  routes: {
    'courses(/)': 'index',
    'courses/:cid(/)': 'overview'
  },

  index: function() {
    // Delegate to the CoursesIndex View and render it inside of the container
    var view = new Eduki.Views.CoursesIndex();
    $('#main-content').html(view.render().el);
  },

  overview: function(cid) {
    // Delegate to the CoursesOverview View and render it inside of the container
    var view = new Eduki.Views.CoursesOverview({attributes:{course_id: cid}});
    $('#main-content').html(view.render().el);
  }

});
