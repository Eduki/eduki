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
	});

	describe("Edit", function() {
		it("renders lesson info form", function() {
			view = new Eduki.Views.LessonsEdit({attributes:{course_id: 1, lesson_id: 1}});
			serverRespond(this.server, 200, fixtures["lesson"]);
			expect(view.$el).toContain('#form-lesson-title');
			expect(view.$el).toContain('#form-lesson-body');
		});

		it("displays error page on lesson fetch error", function() {
			view = new Eduki.Views.LessonsEdit({attributes:{course_id: 1, lesson_id: 1}});
			serverRespond(this.server, 400, fixtures["lesson"]);
			expect(view.$el.find('h1')).toHaveText('Woops! Something went wrong.');
		});

     it('displays popover for no title', function() {
       view = new Eduki.Views.LessonsEdit({attributes:{course_id: 1, lesson_id: 1}});
       serverRespond(this.server, 200, fixtures['lesson']);
       view.$('#update').click();
       expect(view.$el.find('.popover').html()).toMatch('Please provide a title');
     });
	});
});