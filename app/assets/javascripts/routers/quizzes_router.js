/*
 * Handles routing for quiz related pages
 * delegates rendering to each view
 *
 * author: Michael
 */

Eduki.Routers.Quizzes = Backbone.Router.extend({
  routes: {
    'courses/:cid/quizzes/new(/)': 'create',
  },

  // Delegate to the Lesson View and render it inside of the container
  create: function(cid) {
    var view = new Eduki.Views.QuizNew({attributes:{course_id: cid}});
    $('#main-content').html(view.render().el);
  },
});
