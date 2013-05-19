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
       expect(view.$el.find('h1')).toHaveText('Create a Course');
     });

     it('saves a course', function() {
       var view = new Eduki.Views.CoursesNew();
       view.$('input').val('Neeeerp!');
       view.create();
       serverRespond(this.server, 200, fixtures["course"]);
       expect(view.$el.find('.success-message-text')).toHaveText('Course Bear Cooking succesfully created!');
     });

     it('saves a course and renders buttons', function() {
       var view = new Eduki.Views.CoursesNew();
       view.$('input').val('Neeeerp!');
       view.create();
       serverRespond(this.server, 200, fixtures["courses"]);
       var buttons = view.$el.find('.eduki-buttons a');
       expect(buttons[0]).toHaveText('View Course');
       expect(buttons[1]).toHaveText('Create Lesson');
     });

     it('saves a course and buttons have correct path', function() {
       var view = new Eduki.Views.CoursesNew();
       view.$('input').val('Neeeerp!');
       view.create();
       serverRespond(this.server, 200, fixtures["course"]);
       var buttons = view.$el.find('.eduki-buttons a');
       expect($(buttons[0]).attr('href')).toEqual('/#/courses/1');
       expect($(buttons[1]).attr('href')).toEqual('/#/courses/1/lessons/new');
     });

     it('fails saving a course', function() {
       var view = new Eduki.Views.CoursesNew();
       view.$('input').val('Neeeerp!');
       view.create();
       serverRespond(this.server, 400, fixtures["course"]);
       expect(view.$el.find('h1')).toHaveText('Woops! Something went wrong.');
     });

     it('fails saving empty title', function() {
       var view = new Eduki.Views.CoursesNew();
       view.create();
       expect(view.$el.find('.alert')).toBeDefined();
     });

     it('displays invalid error message', function() {
       var view = new Eduki.Views.CoursesNew();
       view.create();
       expect(view.$el.find('.alert').html()).toMatch('A title cannot be empty');
     });

   });
 });
