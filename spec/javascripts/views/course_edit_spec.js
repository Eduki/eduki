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
	});

	describe("Edit", function() {
		it("renders course info form", function() {
			serverRespond(this.server, 200, fixtures["course"]);
			expect(view.$el).toContain('#form-course-title');
			expect(view.$el).toContain('#form-course-description');
		});

		it("displays error page on lesson fetch error", function() {
			serverRespond(this.server, 400, fixtures["course"]);
			expect(view.$el.find('h1')).toHaveText('Woops! Something went wrong.');
		});

		it("renders existing info correctly", function() {
			serverRespond(this.server, 200, fixtures["course"]);
			expect(view.$el.find('#form-course-title').val()).toEqual('Bear Cooking');
			expect(view.$el.find('#form-course-description').val()).toEqual('How to properly cook bears');
		});

	});
});