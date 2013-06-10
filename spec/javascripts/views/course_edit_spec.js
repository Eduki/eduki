/*
 * course_edit_spec is a test suite for editing courses
 *
 * author: Michael
 */

 describe("Course", function () {

	setupFakeServer();
	var view;

	beforeEach(function() {
		currentUser.id = 1;
    currentUser.authenticated = true;
    view = new Eduki.Views.CoursesEdit({attributes:{course_id: 1}});
    view.render();
	});

	describe("Edit", function() {
		it("renders course info form", function() {
			serverRespond(this.server, 200, fixtures["course"]);
			expect(view.$el).toContain('#form-course-title');
			expect(view.$el).toContain('#form-course-description');
		});

		it("displays error page on lesson fetch error", function() {
			spyOn(router, 'route');
			serverRespond(this.server, 400, fixtures["course"]);
			expect(router.route).toHaveBeenCalledWith('/error');
		});

		it("renders existing info correctly", function() {
			serverRespond(this.server, 200, fixtures["course"]);
			expect(view.$el.find('#form-course-title').val()).toEqual('Bear Cooking');
			expect(view.$el.find('#form-course-description').val()).toEqual('How to properly cook bears');
		});

    it('displays popover for no title', function() {
      serverRespond(this.server, 200, fixtures["course"]);
      view.$('#form-course-title').val('');
      view.$('#publish').click();
      expect(view.$el.find('.popover-content').html()).toEqual('Please provide a title');
    });

    it('displays popover for no description', function() {
      serverRespond(this.server, 200, fixtures["course"]);
      view.$('#form-course-description').val('');
      view.$('#publish').click();
      expect(view.$el.find('.popover-content').html()).toEqual('Please provide a valid description');
    });

    it('routes to course on success', function() {
    	spyOn(router, 'route');
			serverRespond(this.server, 200, fixtures["course"]);
			view.$('#form-course-title').val('edited course title');
			view.$('#form-course-description').val('course description hooray');
			view.$('#publish').click();
			serverRespond(this.server, 200, fixtures["course"]);
			expect(router.route).toHaveBeenCalledWith('/courses/1');
    });

    it('displays error page on save success', function() {
    	spyOn(router, 'route');
			serverRespond(this.server, 200, fixtures["course"]);
			view.$('#form-course-title').val('edited course title');
			view.$('#form-course-description').val('course description hooray');
			view.$('#publish').click();
			serverRespond(this.server, 400, fixtures["course"]);
			expect(router.route).toHaveBeenCalledWith('/error');
    });
	});
});
