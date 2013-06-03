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

    it('signup if user not logged in', function() {
      spyOn(router, 'route');
      currentUser.id = -1;
      currentUser.authenticated = false;
      successServerResponses(this.server);
      expect(router.route).toHaveBeenCalledWith('/');
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

    it('no quiz attempts header', function() {
      serverRespond(this.server, 200, fixtures['enrollment']);
      serverRespond(this.server, 200, fixtures['course']);
      serverRespond(this.server, 200, fixtures['quizzes']);
      serverRespond(this.server, 200, []);
      expect(view.$el.find('h3')).toHaveText("You have no quiz attempts. Start taking quizzes for this course now.");
    });

    it('course square if no quiz attempts', function() {
      serverRespond(this.server, 200, fixtures['enrollment']);
      serverRespond(this.server, 200, fixtures['course']);
      serverRespond(this.server, 200, fixtures['quizzes']);
      serverRespond(this.server, 200, []);
      expect(view.$el).toContain('.listing-square');
      expect(view.$('.listing-square span')).toHaveText('Bear Cooking');
    });

    it('table', function() {
      successServerResponses(this.server);
      expect(view.$el).toContain("table");
      expect(view.$el).toContain("th");
    });

    it('table headers', function() {
      successServerResponses(this.server);
      var headers = view.$el.find('th');
      expect(headers[0]).toHaveText('Quiz');
      expect(headers[1]).toHaveText('Total Correct');
      expect(headers[2]).toHaveText('Total Problems');
      expect(headers[3]).toHaveText('% Score');
    });

    it('appropriate number of quiz attempts', function() {
      successServerResponses(this.server);
      var rows = view.$el.find('tbody tr');
      expect(rows.length).toBe(2);
    });

    it('quiz titles', function() {
      successServerResponses(this.server);
      var titles = view.$el.find('tbody td a');
      expect($(titles[0]).html()).toEqual('Quiz 1');
      expect($(titles[1]).html()).toEqual('Quiz 1');
    });

    it('quiz title link', function() {
      successServerResponses(this.server);
      var titles = view.$el.find('tbody td a');
      expect($(titles[0]).attr('href')).toEqual('/#/courses/1/quizzes/1');
      expect($(titles[1]).attr('href')).toEqual('/#/courses/1/quizzes/1');
    });

    it('total correct', function() {
      successServerResponses(this.server);
      var correct = view.$el.find('.correct-score');
      expect($(correct[0]).html()).toEqual('1');
      expect($(correct[1]).html()).toEqual('2');
    });

    it('total problems', function() {
      successServerResponses(this.server);
      var total = view.$el.find('.total-problems');
      expect($(total[0]).html()).toEqual('2');
      expect($(total[1]).html()).toEqual('2');
    });

    it('percent score', function() {
      successServerResponses(this.server);
      var percent = view.$el.find('.percent-score');
      expect($(percent[0]).html()).toEqual('50');
      expect($(percent[1]).html()).toEqual('100');
    });

    it('distinction between good and bad score', function() {
      successServerResponses(this.server);
      var attempt = view.$el.find('tbody  tr');
      expect($(attempt[0]).hasClass('error')).toBe(true);
      expect($(attempt[1]).hasClass('success')).toEqual(true);
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


