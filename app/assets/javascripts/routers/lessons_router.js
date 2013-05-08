Eduki.Routers.Lessons = Backbone.Router.extend({
  routes: {
    'courses/:cid/lessons': 'index',
    'courses/:cid/lessons/:id:': 'lesson',
  },

  index: function(cid) {
    var view = new Eduki.Views.LessonsIndex({attributes:{course_id: cid}});
    $('#main-content').html(view.render().el);
  },

  lesson: function(id) {
    var view = new Eduki.Views.LessonsLesson({attributes:{course_id: cid}});
    $('#main-content').html(view.render().el);
  },

});
