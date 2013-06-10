/*
 * quiz_spec describes a test suite for viewing and taking a quiz
 *
 * author: Jolie Chen
 */

describe('Quiz', function() {
  describe("View", function() {
    beforeEach(function() {
      currentUser.id = 1;
      currentUser.authenticated = true;
    });

    setupFakeServer();
    it("routes error page for when an error occurs", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      view.render();
      spyOn(router, 'route');
      serverRespond(this.server, 301, fixtures['course']);
      serverRespond(this.server, 200, fixtures['quizzes']);
      serverRespond(this.server, 200, fixtures['quiz']);
      expect(router.route).toHaveBeenCalledWith('/error')
    });

    it("renders quiz title", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      view.render();
      successServerResponses(this.server);
      expect(view.$('h1')).toHaveText('Quiz 1');
    });

    it("renders submit button", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      view.render();
      successServerResponses(this.server);
      expect(view.$el).toContain('#submit-quiz');
    });

    it("renders ownership", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      view.render();
      successServerResponses(this.server);
      expect(view.$el).toContain('#quiz-ownership-actions');
    });

    it("renders ownership actions", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      view.render();
      successServerResponses(this.server);
      var actions = view.$('#quiz-ownership-actions').children();
      expect($(actions[0]).attr('id')).toEqual('quiz-ownership-delete');
      expect($(actions[1]).attr('href')).toEqual('/#/courses/1/quizzes/1/edit');
    });

    it("doesn't renders ownership", function() {
      currentUser.id = 4;
      currentUser.authenticated = true;
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      view.render();
      serverRespond(this.server, 200, fixtures['course']);
      serverRespond(this.server, 200, fixtures['quizzes']);
      serverRespond(this.server, 200, fixtures['quiz']);
      serverRespond(this.server, 200, fixtures['enrollments']);
      expect(view.$el).not.toContain('#quiz-ownership-actions');
    });

    it("renders two problems", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      view.render();
      successServerResponses(this.server);
      var problems = view.$el.find('fieldset');
      var possibleAnswers = view.$el.find('input');
      expect(problems.length).toBe(2);
      expect(possibleAnswers.length).toBe(8);
    });

    it("renders message if user is not enrolled", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      view.render();
      serverRespond(this.server, 200, fixtures['course']);
      serverRespond(this.server, 200, fixtures['quizzes']);
      serverRespond(this.server, 200, fixtures['quiz']);
      serverRespond(this.server, 200, {"id":1, "user_id":1, "course_id": 2});
      serverRespond(this.server, 200, fixtures['courses']);
      expect(view.$el).toContain('.alert');
    });

    it("renders modal", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      view.render();
      successServerResponses(this.server);
      view.$('#quiz-ownership-delete').click();
      expect(view.$el).toContain('#delete-confirmation-modal');
    });

    it("routes after deletion", function() {
      spyOn(router, 'route');
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      view.render();
      successServerResponses(this.server);
      view.$('#quiz-ownership-delete').click();
      view.$('#delete').click();
      serverRespond(this.server, 200, []);
      expect(router.route).toHaveBeenCalledWith('/courses/1');
    });

    it("routes to error", function() {
      spyOn(router, 'route');
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      view.render();
      successServerResponses(this.server);
      view.$('#quiz-ownership-delete').click();
      view.$('#delete').click();
      serverRespond(this.server, 404, []);
      expect(router.route).toHaveBeenCalledWith('/error');
    });

    // Tests the other quiz section
    describe("Other Quizzes", function() {
      it("renders course home", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        view.render();
        successServerResponses(this.server);
        expect(view.$el).toContain('#course-home');
      });

      it("renders other quizzes", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        view.render();
        successServerResponses(this.server);
        var otherQuizzes = view.$el.find('.listing-quiz');
        expect(otherQuizzes.length).toBe(3);
      });

      it("renders quiz title", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        view.render();
        successServerResponses(this.server);
        var otherQuizzes = view.$el.find('.listing-quiz span');
        expect(otherQuizzes[1]).toHaveText('Quiz 2');
      });

      it("renders quiz link", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        view.render();
        successServerResponses(this.server);
        var otherQuizzesLinks = view.$el.find('.listing-quiz > a');
        expect($(otherQuizzesLinks[1]).attr('href')).toEqual('/#/courses/1/quizzes/2');
      });
    });


    // Tests problems individually
    describe("Problems", function() {
      it("renders problem 1's question", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        view.render();
        successServerResponses(this.server);
        var questions = view.$el.find('label');
        expect(questions[0]).toHaveText("What is a corgi? A. Dog B. Cat C. Cow D. Derp");
      });

      it("renders problem 2's question", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        view.render();
        successServerResponses(this.server);
        var questions = view.$el.find('label');
        expect(questions[1]).toHaveText("what is 1+1? A. 1 B. 2 C. 3 D. 0");
      });
    });

    // Attempt to take a quiz
    describe("Attempt", function() {
      it("renders 0/0 correct answers for empty answers", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        view.render();
        successServerResponses(this.server);
        view.$('#submit-quiz').click();
        serverRespond(this.server, 200, fixtures['quiz_attempt']);
        var score = view.$el.find('#quiz-results big');
        expect(view.$el).not.toContain('.alert');
        expect(score).toHaveText("You got 0/2 questions correct");
      });

      it("renders 2/2 correct answers for correct answers", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        view.render();
        var problemAttempts = [{answer: "A"},{answer: "B"}];
        successServerResponses(this.server);
        spyOn(view, 'saveAttempt');
        view.$('input[name=problem-1][value=A]').prop('checked', true);
        view.$('input[name=problem-2][value=B]').prop('checked', true);
        view.$('#submit-quiz').click();
        expect(view.saveAttempt).toHaveBeenCalledWith(problemAttempts);
      });

      it("renders 1/2 correct answers for one correct and wrong answer", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        view.render();
        successServerResponses(this.server);
        view.$('input[name=problem-1][value=A]').prop('checked', true);
        view.$('input[name=problem-2][value=C]').prop('checked', true);
        view.$('#submit-quiz').click();
        serverRespond(this.server, 200, fixtures['quiz_attempt']);
        var score = view.$el.find('#quiz-results big');
        expect(score).toHaveText("You got 1/2 questions correct");
      });
    });

    describe('quiz attempt construction', function() {
      it("creates properly all empty answers", function() {
        var problemAttempts = [{answer: ""},{answer: ""}];
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        view.render();
        spyOn(view, 'saveAttempt');
        successServerResponses(this.server);
        view.$('#submit-quiz').click();
        expect(view.saveAttempt).toHaveBeenCalledWith(problemAttempts);
      });

      it("creates properly all filled answers", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        view.render();
        var problemAttempts = [{answer: "A"},{answer: "B"}];
        successServerResponses(this.server);
        spyOn(view, 'saveAttempt');
        view.$('input[name=problem-1][value=A]').prop('checked', true);
        view.$('input[name=problem-2][value=B]').prop('checked', true);
        view.$('#submit-quiz').click();
        expect(view.saveAttempt).toHaveBeenCalledWith(problemAttempts);
      });

      it("creates properly incorrect answers", function() {
        var problemAttempts = [{answer: "A"},{answer: "C"}];
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        view.render();
        successServerResponses(this.server);
        spyOn(view, 'saveAttempt');
        view.$('input[name=problem-1][value=A]').prop('checked', true);
        view.$('input[name=problem-2][value=C]').prop('checked', true);
        view.$('#submit-quiz').click();
        expect(view.saveAttempt).toHaveBeenCalledWith(problemAttempts);
      });

      it("creates properly incorrect answers", function() {
        var problemAttempts = [{answer: "A"},{answer: "C"}];
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        view.render();
        successServerResponses(this.server);
        spyOn(view, 'saveAttempt');
        view.$('input[name=problem-1][value=A]').prop('checked', true);
        view.$('input[name=problem-2][value=C]').prop('checked', true);
        view.$('#submit-quiz').click();
        expect(view.saveAttempt).toHaveBeenCalledWith(problemAttempts);
      });
    });
  });
});

// Helper function to send back successful respones for all 3 api calls
// necessary to render a quiz
function successServerResponses(server) {
  serverRespond(server, 200, fixtures['course']);
  serverRespond(server, 200, fixtures['quizzes']);
  serverRespond(server, 200, fixtures['quiz']);
  serverRespond(server, 200, fixtures['enrollments']);
  serverRespond(server, 200, fixtures['courses']);
}

