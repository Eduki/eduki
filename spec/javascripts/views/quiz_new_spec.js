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

	describe('New', function() {
		var view;
		beforeEach(function () {
			setupFakeServer();
			view = new Eduki.Views.QuizNew({attributes:{course_id: 1}});
			view.$('#create-quiz-title').val('quizz');
			view.$('#problem-0').val('problem');
			view.$('.controls input[type=radio]:first-child').attr('checked', true);
		});

		it('saves a quiz and renders the button', function() {
			view.submit();
			serverRespond(this.server, 200, fixtures['quiz']);
			expect(view.$el.find('.eduki-button-primary')).toHaveText('View Quiz');
		});

		it('saves a quiz and button has correct path', function() {
			view.submit();
			serverRespond(this.server, 200, fixtures['quiz']);
			expect(view.$el.find('.eduki-button-primary').attr('href')).toEqual('/#/courses/1/quizzes/1');
		});

		it('fails to save a quiz and displays error message', function() {
			view.submit();
			serverRespond(this.server, 404, fixtures['quiz']);
			expect(view.$el.find('h1')).toHaveText('Woops! Something went wrong.');
		});

	});
});