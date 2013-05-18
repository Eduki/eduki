/*
 * Handles routing for lesson related pages
 * delegates rendering to each view
 *
 * author: Jolie
 */

Eduki.Routers.Quizzes = Backbone.Router.extend({
  routes: {
    'courses/:cid/quizzes/new(/)': 'create',
    'courses/:cid/quizzes/:id(/)': 'quiz'
  },

  // Delegate to the Lesson Creation page and render the form inside the container
  create: function(cid) {
  	var view = new Eduki.Views.QuizzesNew({attributes:{course_id: cid}});
  	$('#main-content').html(view.render().el);
  },

  // Delegate to the Lesson View and render it inside of the container
  quiz: function(cid, id) {
    var view = new Eduki.Views.QuizzesQuiz({attributes:{course_id: cid, quiz_id: id}});
    $('#main-content').html(view.render().el);
  },
});

