/*
 * course_overview_spec describes a test suite for a course's overview page
 *
 * author: Jolie Chen
 */

describe('Course', function() {
  beforeEach(function() {
    currentUser.id = 1;
  });
  describe('Overview', function() {
    setupFakeServer();

    it('renders error page', function() {
      var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
      serverRespond(this.server, 301, fixtures['course']);
      serverRespond(this.server, 200, fixtures['quizzes']);
      serverRespond(this.server, 200, fixtures['lessons']);
      expect(view.$el.find('h1')).toHaveText('Woops! Something went wrong.');
    });

    it('renders course title', function() {
      var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
      successServerResponses(this.server);
      expect(view.$el.find('h1').html()).toMatch('Bear Cooking');
    });

    it('renders quiz create button', function() {
      var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
      successServerResponses(this.server);
      var buttons = view.$el.find('.eduki-button-primary span');
      expect(buttons[1]).toHaveText('create');
    });

    it('renders lesson create button', function() {
      var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
      successServerResponses(this.server);
      var buttons = view.$el.find('.eduki-button-primary span');
      expect(buttons[2]).toHaveText('create');
    });

    // Tests for lessons
    describe('Lessons', function() {
      it("renders lessons list", function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        expect(view.$el.find('#course-lessons')).toContain('li');
      });

      it('renders all lessons for that course', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        var lessons = view.$el.find('#course-lessons li a');
        expect(lessons.length).toBe(3);
      });

      it('renders lessons title', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        var lessons = view.$el.find('#course-lessons li a');
        expect(lessons[1]).toHaveText('Chopping Tongue');
      });

      it('renders lessons link', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        var lessons = view.$el.find('#course-lessons li a');
        expect($(lessons[1]).attr('href')).toEqual('/#/courses/1/lessons/2');
      });
    });

    // Tests for quizzes
      describe('Quizzes', function() {
      it('renders quizzes list', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        expect(view.$el.find('#course-quizzes')).toContain('li');
      });

      it('renders all quizzes for that course', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        var quizzes = view.$el.find('#course-quizzes li a');
        expect(quizzes.length).toBe(3);
      });

      it('renders quiz title', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        var quizzes = view.$el.find('#course-quizzes li a');
        expect(quizzes[1]).toHaveText('Quiz 2');
      });

      it('renders quiz link', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        var quizzes = view.$el.find('#course-quizzes li a');
        expect($(quizzes[1]).attr('href')).toEqual('/#/courses/1/quizzes/2');
      });
    });

    describe('Enrollments', function() {
      it('renders enroll button', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 2}});
        successServerResponses(this.server);
        expect(view.$('#enroll span')).toHaveText('enroll');
      });

      it('doesn\'t render button for user not logged in', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 2}});
        serverRespond(this.server, 200, fixtures['course']);
        serverRespond(this.server, 200, fixtures['quizzes']);
        serverRespond(this.server, 200, fixtures['lessons']);
        expect(view.$('h1')).not.toContain('button');
      });

      it('enrolled user', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        expect(view.$('#enroll span')).toHaveText('enrolled');
      });

      it('enrolls user', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 2}});
        successServerResponses(this.server);
        expect(view.$('#enroll span')).toHaveText('enroll');
        view.$('#enroll').click();
        serverRespond(this.server, 200, fixtures['enrollment']);
        expect(view.$('#enroll span')).toHaveText('enrolled');
      });

    });
  });

  // Helper function to send back successful respones for all 3 api calls
  // necessary to render a course overview
  function successServerResponses(server) {
    serverRespond(server, 200, fixtures['enrollment']);
    serverRespond(server, 200, fixtures['course']);
    serverRespond(server, 200, fixtures['quizzes']);
    serverRespond(server, 200, fixtures['lessons']);
  }

});
