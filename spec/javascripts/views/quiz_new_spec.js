/*
 * quiz_new_spec is a test suite for creating quizzes
 *
 * author: Michael
 */

describe('Quiz', function() {

	beforeEach(function() {
    setupFakeServer();
  });

	describe('Render', function() {
		it('renders title', function() {
      var view = new Eduki.Views.QuizNew({attributes:{course_id: 1}});
      expect(view.$el.find('h1').html()).toMatch('Create a Quiz');
    });

		it('renders quiz title input', function() {
			var view = new Eduki.Views.QuizNew({attributes:{course_id: 1}});
			expect(view.$el.find('#create-quiz-title')).toBeDefined();
		});

    it('renders first problem', function() {
    	var view = new Eduki.Views.QuizNew({attributes:{course_id: 1}});
      expect(view.$el.find('#create-quiz-problems')).toContain('fieldset');
      expect(view.$el.find('.create-quiz-answer')).toContain('input[type=radio]');
    });

    it('renders submit button', function() {
    	var view = new Eduki.Views.QuizNew({attributes:{course_id: 1}});
    	var submit = view.$el.find('.eduki-button-primary');
    	expect(submit[0]).toHaveText('Create Quiz');
    });
	});

	describe('Adding', function() {

	});
});