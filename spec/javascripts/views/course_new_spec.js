/*
 * course_new_spec is a test suite for creating courses
 *
 * author: Jolie Chen
 */

 describe('Course', function() {
   describe('New', function(){
    setupFakeServer();
    var view;

    beforeEach(function() {
      view = new Eduki.Views.CoursesNew();
      view.render();
    });

    it('renders form', function() {
      expect(view.$el.find('form')).toContain('label');
      expect(view.$el.find('form')).toContain('button');
      expect(view.$el.find('form')).toContain('input[type=text]');
    });

    it('renders form title', function() {
      expect(view.$el.find('h1')).toHaveText('Create Course');
    });

    it('saves a course and redirects to course overview page', function() {
      spyOn(router, 'route');
      view.$('#form-course-title').val('Course Bear Cooking succesfully created!');
      view.$('#form-course-description').val('herp');
      view.$('#publish').click();
      serverRespond(this.server, 200, fixtures["course"]);
      expect(router.route).toHaveBeenCalledWith('/courses/1');
    });

    it('fails saving a course', function() {
      spyOn(router, 'route');
      view.$('#form-course-title').val('Course Bear Cooking succesfully created!');
      view.$('#form-course-description').val('herp');
      view.$('#publish').click();
      serverRespond(this.server, 400, fixtures["course"]);
      expect(router.route).toHaveBeenCalledWith('/error');
    });

    it('displays popover for no title', function() {
      view.$('#form-course-description').val('herp');
      view.$('#publish').click();
      expect(view.$el.find('.popover').html()).toMatch('Please provide a title');
    });

    it('displays popover for no description', function() {
      view.$('#form-course-title').val('herp');
      view.$('#publish').click();
      expect(view.$el.find('.popover').html()).toMatch('Please provide a valid description');
    });
   });
 });
