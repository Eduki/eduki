/*
 * quiz_new_spec is a test suite for creating quizzes
 *
 * author: Michael
 */

describe('Create Quiz', function() {

	beforeEach(function() {
    setupFakeServer();
  });

	describe('Render', function() {
		it('renders title', function() {
      var view = new Eduki.Views.QuizNew({attributes:{course_id: 1}});
      expect(view.$el.find('h1').html()).toEqual('Create a Quiz');
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

    it('renders delete icon', function() {
    	var view = new Eduki.Views.QuizNew({attributes:{course_id: 1}});
      expect(view.$el.find('.create-quiz-problem')).toContain('.create-quiz-delete');
    });

    it('renders add icon', function() {
    	var view = new Eduki.Views.QuizNew({attributes:{course_id: 1}});
      expect(view.$el.find('#create-quiz-form')).toContain('#create-quiz-add');
    });

    it('renders submit button', function() {
    	var view = new Eduki.Views.QuizNew({attributes:{course_id: 1}});
    	var submit = view.$el.find('.eduki-button-primary');
    	expect(submit[0]).toHaveText('Publish');
    });
	});

  describe('Problem Manipulation', function() {
		var view;
		beforeEach(function () {
			view = new Eduki.Views.QuizNew({attributes:{course_id: 1}});
      /*
			view.$('#create-quiz-title').val('quizz');
			view.$('#problem-0').val('problem');
			view.$('.controls input[type=radio]:first-child').attr('checked', true);
      */
		});

    it('adds problem', function() {
      expect(view.$el.find('.create-quiz-problem').length).toBe(1);
      view.$('#create-quiz-add').click();
      expect(view.$el.find('.create-quiz-problem').length).toBe(2);
    });

    it('deletes a problem', function() {
      view.$('#create-quiz-add').click();
      expect(view.$el.find('.create-quiz-problem').length).toBe(2);
      var deleteButtons = view.$el.find('.create-quiz-delete');
      $(deleteButtons[0]).click();
      expect(view.$el.find('.create-quiz-problem').length).toBe(1);
    });

    it('deletes targeted problem', function() {
      view.$('#create-quiz-add').click();
      var deleteButtons = view.$el.find('.create-quiz-delete');
      $(deleteButtons[1]).click();
      expect(view.$el).toContain('#problem-0');
      expect(view.$el).not.toContain('#problem-1');
    });

    it('maintains at least one problem', function() {
      expect(view.$el.find('.create-quiz-problem').length).toBe(1);
      var problems = view.$el.find('.create-quiz-delete');
      $(problems[0]).click();
      expect(view.$('.create-quiz-problem').length).toBe(1);
    });

    it('display error for deleting too many problems', function() {
      expect(view.$el.find('.create-quiz-problem').length).toBe(1);
      var problems = view.$el.find('.create-quiz-delete');
      $(problems[0]).click();
      expect(view.$el.find('.popover-content').html()).toEqual('A quiz must have at least one problem');
    });

  });

	describe('Save', function() {
		var view;
		beforeEach(function () {
			setupFakeServer();
			view = new Eduki.Views.QuizNew({attributes:{course_id: 1}});
			view.$('#create-quiz-title').val('quizz');
			view.$('#problem-0').val('problem');
			view.$('.controls input[type=radio]:first-child').attr('checked', true);
		});

		it('saves a quiz and routes to quiz', function() {
      spyOn(router, 'route');
			view.submit();
			serverRespond(this.server, 200, fixtures['quiz']);
      expect(router.route).toHaveBeenCalledWith('/courses/1/quizzes/1');
		});

		it('fails to save a quiz and displays error message', function() {
			view.submit();
			serverRespond(this.server, 404, fixtures['quiz']);
			expect(view.$el.find('h1')).toHaveText('Woops! Something went wrong.');
		});

    it('displays error if no title', function() {
			view.$('#create-quiz-title').val('');
			view.$('#publish').click();
      var popovers = view.$el.find('.popover-content');
      expect($(popovers[0]).html()).toEqual('Please provide a title');
      expect($(popovers[1]).html()).toEqual('There are errors with your quiz');
    });

    it('displays error if no question', function() {
			view.$('#problem-0').val('');
			view.$('#publish').click();
      var popovers = view.$el.find('.popover-content');
      expect($(popovers[0]).html()).toEqual('Please provide a question and correct answer');
      expect($(popovers[1]).html()).toEqual('There are errors with your quiz');
    });

    it('displays error if no answer', function() {
			view.$('.controls input[type=radio]:first-child').attr('checked', false);
			view.$('#publish').click();
      var popovers = view.$el.find('.popover-content');
      expect($(popovers[0]).html()).toEqual('Please provide a question and correct answer');
      expect($(popovers[1]).html()).toEqual('There are errors with your quiz');
    });

	});
});
