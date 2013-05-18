/*
 * quiz_spec describes a test suite for viewing and taking a quiz
 * 
 * author: Jolie Chen
 */
describe('Quiz', function() {
  describe("Show", function() {
    setupFakeServer();
    it("renders course header", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      serverRespond(this.server, 200, fixtures['course']);
      serverRespond(this.server, 200, fixtures['quizzes']);
      serverRespond(this.server, 200, fixtures['quiz']);
      expect(view.$el.find('h1')).toHaveText('Bear Cooking');
    });

    it("renders quiz title", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      serverRespond(this.server, 200, fixtures['course']);
      serverRespond(this.server, 200, fixtures['quizzes']);
      serverRespond(this.server, 200, fixtures['quiz']);
      var h2_items = view.$el.find('h2');
      expect(h2_items[0]).toHaveText('Quiz 1');
    });

    it("renders other quizzes header", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      serverRespond(this.server, 200, fixtures['course']);
      serverRespond(this.server, 200, fixtures['quizzes']);
      serverRespond(this.server, 200, fixtures['quiz']);
      var h2_items = view.$el.find('h2');
      expect(h2_items[1]).toHaveText('Other Quizzes');
    });

    it("renders two problems", function() {
      var view = new Eduki.Views.QuizShow({attributes:{course_id: 1, quiz_id: 1}});
      serverRespond(this.server, 200, fixtures['course']);
      serverRespond(this.server, 200, fixtures['quizzes']);
      serverRespond(this.server, 200, fixtures['quiz']);
      var h2_items = view.$el.find('fieldset');
      expect(h2_items.length).toBe(2);
    });

  });
});

