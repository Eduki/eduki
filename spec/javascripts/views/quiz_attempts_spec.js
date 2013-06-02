/*
 * Describes the behavior of the quiz attempts page
 *
 * author: Jolie Chen
 */

describe('Quiz Attempts', function() {
  var view;
  setupFakeServer();
  describe('Renders', function() {
    beforeEach(function() {
      currentUser.flush_credentials();
      currentUser.id = 1;
      currentUser.authenticated = true;
      view = new Eduki.Views.QuizAttempts({attributes:{enrollment_id: 1}});
    });

    it('course header', function() {
      successServerResponses(this.server);
      expect(view.$el.find('h1')).toHaveText("Bear Cooking");
    });

    it('course header link', function() {
      successServerResponses(this.server);
      expect(view.$el.find('h1 a').attr('href')).toEqual("/#/courses/1");
    });

    it('quiz attempts header', function() {
      successServerResponses(this.server);
      expect(view.$el.find('h2')).toHaveText("Quiz Attempts");
    });
  });
  // Helper function to send back successful respones for all api calls
  // necessary to render a course overview
  function successServerResponses(server) {
    serverRespond(server, 200, fixtures['enrollment']);
    serverRespond(server, 200, fixtures['course']);
    serverRespond(server, 200, fixtures['quizzes']);
    serverRespond(server, 200, fixtures['quiz_attempts']);
  }
});


