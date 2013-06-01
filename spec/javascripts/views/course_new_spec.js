/*
 * course_new_spec is a test suite for creating courses
 *
 * author: Jolie Chen
 */

 describe('Course', function() {
   describe('New', function(){
     setupFakeServer();
     it('renders form', function() {
       var view = new Eduki.Views.CoursesNew();
       expect(view.$el.find('form')).toContain('label');
       expect(view.$el.find('form')).toContain('button');
       expect(view.$el.find('form')).toContain('input[type=text]');
     });

     it('renders form title', function() {
       var view = new Eduki.Views.CoursesNew();
       expect(view.$el.find('h1')).toHaveText('Create Course');
     });

     it('saves a course and redirects to course overview page', function() {
       var view = new Eduki.Views.CoursesNew();
       spyOn(router, 'route');
       view.$('#create-course-title').val('Course Bear Cooking succesfully created!');
       view.$('#create-course-description').val('herp');
       view.$('#publish').click();
       serverRespond(this.server, 200, fixtures["course"]);
       expect(router.route).toHaveBeenCalledWith('/courses/1');
     });

     it('fails saving a course', function() {
       var view = new Eduki.Views.CoursesNew();
       view.$('#create-course-title').val('Course Bear Cooking succesfully created!');
       view.$('#create-course-description').val('herp');
       view.$('#publish').click();
       serverRespond(this.server, 400, fixtures["course"]);
       expect(view.$el.find('h1')).toHaveText('Woops! Something went wrong.');
     });

     it('displays popover for no title', function() {
       var view = new Eduki.Views.CoursesNew();
       view.$('#create-course-description').val('herp');
       view.$('#publish').click();
       expect(view.$el.find('.popover').html()).toMatch('Please provide a title');
     });

     it('displays popover for no description', function() {
       var view = new Eduki.Views.CoursesNew();
       view.$('#create-course-title').val('herp');
       view.$('#publish').click();
       expect(view.$el.find('.popover').html()).toMatch('Please provide a valid description');
     });
   });
 });
