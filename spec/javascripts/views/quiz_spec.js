/*
 * quiz_spec describes a test suite for viewing and taking a quiz
 * 
 * author: Jolie Chen
 */
 
describe('View Quiz', function() {
  describe("Render", function() {
    setupFakeServer();
    it("renders error page for when an error occurs", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      serverRespond(this.server, 301, fixtures['course']);
      serverRespond(this.server, 200, fixtures['quizzes']);
      serverRespond(this.server, 200, fixtures['quiz']);
      expect(view.$el.find('h1')).toHaveText('Woops! Something went wrong.');
    });

    it("renders course header", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      successServerResponses(this.server);
      expect(view.$el.find('h1')).toHaveText('Bear Cooking');
    });

    it("renders course header link", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      successServerResponses(this.server);
      expect(view.$el.find('h1 a').attr('href')).toEqual('/#/courses/1');
    });

    it("renders quiz title", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      successServerResponses(this.server);
      var h2Items= view.$el.find('h2');
      expect(h2Items[0]).toHaveText('Quiz 1');
    });

    it("renders submit button", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      successServerResponses(this.server);
      var buttons = view.$el.find('button');
      expect(buttons[0]).toHaveText('Submit');
    });

    it("renders submit button", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      successServerResponses(this.server);
      var buttons = view.$el.find('button');
      expect(buttons[1]).toHaveText('Reset');
    });

    it("renders two problems", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      successServerResponses(this.server);
      var problems = view.$el.find('fieldset');
      var possibleAnswers = view.$el.find('input');
      expect(problems.length).toBe(2);
      expect(possibleAnswers.length).toBe(8);
    });

    // Tests the other quiz section
    describe("Other Quizzes", function() {
      it("renders other quizzes header", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        successServerResponses(this.server);
        var h2Items = view.$el.find('h2');
        expect(h2Items[1]).toHaveText('Other Quizzes');
      });

      it("renders other quizzes", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        successServerResponses(this.server);
        var otherQuizzes = view.$el.find('#course-quizzes-list li');
        expect(otherQuizzes.length).toBe(3);
      });

      it("renders quiz title", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        successServerResponses(this.server);
        var otherQuizzes = view.$el.find('#course-quizzes-list li');
        expect(otherQuizzes[1]).toHaveText('Quiz 2');
      });

      it("renders quiz link", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        successServerResponses(this.server);
        var otherQuizzesLinks = view.$el.find('#course-quizzes-list li a');
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
        view.submit();
        var score = view.$el.find('#quiz-results p');
        expect(score).toHaveText("You got 0/2 questions correct");
      });

      it("renders 2/2 correct answers for correct answers", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        successServerResponses(this.server);
        view.$('input[name=problem-1][value=A]').prop('checked', true);
        view.$('input[name=problem-2][value=B]').prop('checked', true);
        view.submit();
        var score = view.$el.find('#quiz-results p');
        expect(score).toHaveText("You got 2/2 questions correct");
      });

      it("renders 1/2 correct answers for one correct and wrong answer", function() {
        var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
        successServerResponses(this.server);
        view.$('input[name=problem-1][value=A]').prop('checked', true);
        view.$('input[name=problem-2][value=C]').prop('checked', true);
        view.submit();
        var score = view.$el.find('#quiz-results p');
        expect(score).toHaveText("You got 1/2 questions correct");
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
}

