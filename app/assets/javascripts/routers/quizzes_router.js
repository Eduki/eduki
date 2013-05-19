/*
 * Handles routing for quiz related pages
 * delegates rendering to each view
 *
 * author: Michael, Jolie
 */

Eduki.Routers.Quizzes = Backbone.Router.extend({
  routes: {
    'courses/:cid/quizzes/new(/)': 'create',
    'courses/:cid/quizzes/:id(/)': 'quiz'
  },

  // Delegate to the Quiz Creation page and render the form inside the container
  create: function(cid) {
    var view = new Eduki.Views.QuizzesNew({attributes:{course_id: cid}});
    $('#main-content').html(view.render().el);
  },

  // Delegate to the Quiz View and render it inside of the container
  quiz: function(cid, id) {
    var view = new Eduki.Views.QuizShow({attributes:{course_id: cid, quiz_id: id}});
    $('#main-content').html(view.render().el);
  },
});

