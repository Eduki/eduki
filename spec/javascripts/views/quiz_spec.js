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
    it("renders error page for when an error occurs", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      serverRespond(this.server, 301, fixtures['course']);
      serverRespond(this.server, 200, fixtures['quizzes']);
      serverRespond(this.server, 200, fixtures['quiz']);
      expect(view.$el.find('h1')).toHaveText('Woops! Something went wrong.');
    });

    it("renders quiz title", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      successServerResponses(this.server);
      expect(view.$('h1')).toHaveText('Quiz 1');
    });

    it("renders submit button", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      successServerResponses(this.server);
      expect(view.$el).toContain('#submit-quiz');
    });

    it("renders two problems", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      successServerResponses(this.server);
      var problems = view.$el.find('fieldset');
      var possibleAnswers = view.$el.find('input');
      expect(problems.length).toBe(2);
      expect(possibleAnswers.length).toBe(8);
    });

    it("renders message if user is not enrolled", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        serverRespond(this.server, 200, fixtures['course']);
        serverRespond(this.server, 200, fixtures['quizzes']);
        serverRespond(this.server, 200, fixtures['quiz']);
        serverRespond(this.server, 200, {"id":1, "user_id":1, "course_id": 2});
        expect(view.$el).toContain('.alert');
    });

    // Tests the other quiz section
    describe("Other Quizzes", function() {
      it("renders course home", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        successServerResponses(this.server);
        expect(view.$el).toContain('#course-home');
      });

      it("renders other quizzes", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        successServerResponses(this.server);
        var otherQuizzes = view.$el.find('.listing-quiz');
        expect(otherQuizzes.length).toBe(3);
      });

      it("renders quiz title", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        successServerResponses(this.server);
        var otherQuizzes = view.$el.find('.listing-quiz span');
        expect(otherQuizzes[1]).toHaveText('Quiz 2');
      });

      it("renders quiz link", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        successServerResponses(this.server);
        var otherQuizzesLinks = view.$el.find('.listing-quiz > a');
        expect($(otherQuizzesLinks[1]).attr('href')).toEqual('/#/courses/1/quizzes/2');
      });
    });


    // Tests problems individually
    describe("Problems", function() {
      it("renders problem 1's question", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        successServerResponses(this.server);
        var questions = view.$el.find('label');
        expect(questions[0]).toHaveText("What is a corgi? A. Dog B. Cat C. Cow D. Derp");
      });

      it("renders problem 2's question", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        successServerResponses(this.server);
        var questions = view.$el.find('label');
        expect(questions[1]).toHaveText("what is 1+1? A. 1 B. 2 C. 3 D. 0");
      });
    });

    // Attempt to take a quiz
    describe("Attempt", function() {
      it("renders 0/0 correct answers for empty answers", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        successServerResponses(this.server);
        view.$('#submit-quiz').click();
        serverRespond(this.server, 200, fixtures['quiz_attempt']);
        var score = view.$el.find('#quiz-results big');
        expect(view.$el).not.toContain('.alert');
        expect(score).toHaveText("You got 0/2 questions correct");
      });

      it("renders 2/2 correct answers for correct answers", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
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
        spyOn(view, 'saveAttempt');
        successServerResponses(this.server);
        view.$('#submit-quiz').click();
        expect(view.saveAttempt).toHaveBeenCalledWith(problemAttempts);
      });

      it("creates properly all filled answers", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
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
}

