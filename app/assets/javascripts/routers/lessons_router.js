Eduki.Routers.Lessons = Backbone.Router.extend({
  routes: {
    'courses/:cid/lessons/:id': 'lesson',
    'courses/:cid/': 'index',
  },

  index: function(cid) {
    var view = new Eduki.Views.LessonsIndex({attributes:{course_id: cid}});
    $('#main-content').html(view.render().el);
  },

  lesson: function(cid, id) {
    var view = new Eduki.Views.LessonsLesson({attributes:{course_id: cid, lesson_id: id}});
    $('#main-content').html(view.render().el);
  },

});
