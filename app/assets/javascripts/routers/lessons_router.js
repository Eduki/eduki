Eduki.Routers.Lessons = Backbone.Router.extend({
  routes: {
    'courses/:cid/lessons/:id(/)': 'lesson',
  },

  // Delegate to the StaticIndex View and render it inside of the container
  lesson: function(cid, id) {
    var view = new Eduki.Views.LessonsLesson({attributes:{course_id: cid, lesson_id: id}});
    $('#main-content').html(view.render().el);
  }

});
