/*
 * lesson_new_spec is a test suite for creating lessons
 *
 * author: Michael
 */

describe('Lesson', function() {
  setupFakeServer();
  var view;
  beforeEach(function() {
  	view = new Eduki.Views.LessonsCreate({attributes:{course_id: 1}});
  });

	describe('New', function() {
    it('renders form', function() {
      expect(view.$el).toContain('form');
    });

    it('renders title input', function() {
      expect(view.$el).toContain('#form-lesson-title');
    });

    it('renders body input', function() {
      expect(view.$el).toContain('#form-lesson-body');
    });

    it('renders publish button', function() {
      expect(view.$el).toContain('#publish');
    });

    it('displays error when both inputs empty', function() {
      view.$('#publish').click();
      expect(view.$el).toContain('.popover');
      expect(view.$('.popover')).toHaveText('Please provide a title');
    });

    it('displays error when empty title', function() {
      view.$('#form-lesson-body').val('derp');
      view.$('#publish').click();
      expect(view.$el).toContain('.popover');
      expect(view.$('.popover')).toHaveText('Please provide a title');
    });

    it('displays error when empty body', function() {
      view.$('#form-lesson-title').val('derp');
      view.$('#publish').click();
      expect(view.$el).toContain('.popover');
      expect(view.$('.popover')).toHaveText('Please provide lesson content');
    });

    it('displays error when server responds with error', function() {
      view.$('#form-lesson-title').val('derp');
      view.$('#form-lesson-body').val('derp');
      view.$('#publish').click();
      serverRespond(this.server, 404, fixtures['lesson']);
      expect(view.$('h1')).toHaveText('Woops! Something went wrong.');
    });

    it('redirects when lesson successful', function() {
      spyOn(router, 'route');
      view.$('#form-lesson-title').val('derp');
      view.$('#form-lesson-body').val('derp');
      view.$('#publish').click();
      serverRespond(this.server, 200, fixtures['lesson']);
      expect(router.route).toHaveBeenCalledWith('/courses/1/lessons/1');
    });
	});
});
