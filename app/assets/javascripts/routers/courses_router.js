/* 
 * Handles routing for course related pages
 * delegates rendering to each view
 *
 * author: Jolie
 */
Eduki.Routers.Courses = Backbone.Router.extend({
  routes: {
    'courses(/)': 'index',
    'courses/new': 'create',
    'courses/:cid(/)': 'overview',
    'courses/:cid/edit(/)': 'edit'
  },

  index: function(query) {
    // Delegate to the CoursesIndex View and render it inside of the container
    var view = new Eduki.Views.CoursesIndex(query);
    $('#main-content').html(view.render().el);
  },

  create: function() {
    // Delegate to the CoursesOverview View and render it inside of the container
    var view = new Eduki.Views.CoursesNew();
    $('#main-content').html(view.render().el);
  },

  overview: function(cid) {
    // Delegate to the CoursesOverview View and render it inside of the container
    var view = new Eduki.Views.CoursesOverview({attributes:{course_id: cid}});
    $('#main-content').html(view.render().el);
  },

  edit: function(cid) {
    var view = new Eduki.Views.CoursesEdit({attributes:{course_id: cid}});
    $('#main-content').html(view.render().el);
  }
});
