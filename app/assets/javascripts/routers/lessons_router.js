/*
 * Handles routing for lesson related pages
 * delegates rendering to each view
 *
 * author: Michael
 */

Eduki.Routers.Lessons = Backbone.Router.extend({
  routes: {
    'courses/:cid/lessons/new(/)': 'create',
    'courses/:cid/lessons/:id(/)': 'lesson'
  },

  // Delegate to the Lesson View and render it inside of the container
  lesson: function(cid, id) {
    var view = new Eduki.Views.LessonsLesson({attributes:{course_id: cid, lesson_id: id}});
    $('#main-content').html(view.render().el);
  },

  // Delegate to the Lesson Creation page and render the form inside the container
  create: function(cid) {
  	var view = new Eduki.Views.LessonsCreate({attributes:{course_id: cid}});
  	$('#main-content').html(view.render().el);
  }

});
