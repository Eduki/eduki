/*
 * lesson_edit_spec is a test suite for editing lessons
 *
 * author: Michael
 */

 describe("Lesson", function () {

	setupFakeServer();
	var view;

	beforeEach(function() {
		currentUser.id = 1;
    currentUser.authenticated = true;
    view = new Eduki.Views.LessonsEdit({attributes:{course_id: 1, lesson_id: 1}});
	});

	describe("Edit", function() {
		it("renders lesson info form", function() {
			serverRespond(this.server, 200, fixtures["lesson"]);
			expect(view.$el).toContain('#form-lesson-title');
			expect(view.$el).toContain('#form-lesson-body');
		});

		it("displays error page on lesson fetch error", function() {
			serverRespond(this.server, 400, fixtures["lesson"]);
			expect(view.$el.find('h1')).toHaveText('Woops! Something went wrong.');
		});

		it("renders existing info correctly", function() {
			serverRespond(this.server, 200, fixtures["lesson"]);
			expect(view.$el.find('#form-lesson-title').val()).toEqual('Chopping Liver');
			expect(view.$el.find('#form-lesson-body').val()).toEqual('Derp');
		});

    it('displays popover for no title', function() {
      serverRespond(this.server, 200, fixtures["lesson"]);
      view.$('#form-lesson-title').val('');
      view.$('#update').click();
      expect(view.$el.find('.popover-content').html()).toEqual('Please provide a title');
    });

    it('displays popover for no body', function() {
      serverRespond(this.server, 200, fixtures["lesson"]);
      view.$('#form-lesson-body').val('');
      view.$('#update').click();
      expect(view.$el.find('.popover-content').html()).toEqual('Please provide lesson content');
    });

    it('redirects to lesson on success', function() {
    	spyOn(router, 'route');
			serverRespond(this.server, 200, fixtures["lesson"]);
			view.$('#form-lesson-title').val('edited lesson title');
			view.$('#form-lesson-body').val('lessons yyeayeayea');
			view.$('#update').click();
			serverRespond(this.server, 200, fixtures["lesson"]);
			expect(router.route).toHaveBeenCalledWith('/courses/1/lessons/1');
    });

    it('displays error on lesson save error', function() {
    	serverRespond(this.server, 200, fixtures["lesson"]);
			view.$('#form-lesson-title').val('edited lesson title');
			view.$('#form-lesson-body').val('lessons yyeayeayea');
			view.$('#update').click();
			serverRespond(this.server, 400, fixtures["lesson"]);
			expect(view.$el.find('h1')).toHaveText('Woops! Something went wrong.');
    });
	});
});
