/*
 * course_overview_spec describes a test suite for a course's overview page
 *
 * author: Jolie Chen
 */

describe('Course', function() {
  beforeEach(function() {
    currentUser.id = 1;
    currentUser.authenticated = true;
  });
  describe('Overview', function() {
    setupFakeServer();
    it('renders error page', function() {
      var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
      serverRespond(this.server, 404, fixtures['course']);
      expect(view.$el.find('h1')).toHaveText('Woops! Something went wrong.');
    });

    it('renders course title', function() {
      var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
      view.render();
      successServerResponses(this.server);
      expect(view.$el.find('h1').html()).toMatch('Bear Cooking');
    });

    it('renders quiz create button', function() {
      var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
      successServerResponses(this.server);
      expect(view.$el).toContain('#quiz-create');
    });

    it('renders lesson create button', function() {
      var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
      successServerResponses(this.server);
      expect(view.$el).toContain('#lesson-create');
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
        var lessons = view.$el.find('.listing-lesson > a');
        expect(lessons.length).toBe(3);
      });

      it('renders lessons title', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        var lessons = view.$el.find('.listing-lesson > a');
        expect(lessons[1]).toHaveText('Chopping Tongue');
      });

      it('renders lessons link', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        var lessons = view.$el.find('.listing-lesson > a');
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
        var quizzes = view.$el.find('.listing-quiz > a');
        expect(quizzes.length).toBe(3);
      });

      it('renders quiz title', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        var quizzes = view.$el.find('.listing-quiz > a');
        expect(quizzes[1]).toHaveText('Quiz 2');
      });

      it('renders quiz link', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        var quizzes = view.$el.find('.listing-quiz > a');
        expect($(quizzes[1]).attr('href')).toEqual('/#/courses/1/quizzes/2');
      });
    });

    describe('Enrollments', function() {
      it('renders enroll button', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 2}});
        serverRespond(this.server, 200, {"id":2, "title":"Bear Cooking"});
        serverRespond(this.server, 200, fixtures['quizzes']);
        serverRespond(this.server, 200, fixtures['lessons']);
        serverRespond(this.server, 200, fixtures['enrollments']);
        expect(view.$el).toContain('#enroll');
      });

      it('renders enrolled button', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        expect(view.$el).toContain('#enrolled');
      });

      it('doesn\'t render button for user not logged in', function() {
        currentUser.authenticated = false;
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 2}});
        serverRespond(this.server, 200, fixtures['course']);
        serverRespond(this.server, 200, fixtures['quizzes']);
        serverRespond(this.server, 200, fixtures['lessons']);
        expect(view.$('h1')).not.toContain('button');
      });

      it('enrolls user', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 2}});
        serverRespond(this.server, 200, {"id":3, "title":"Bear Cooking"});
        serverRespond(this.server, 200, fixtures['quizzes']);
        serverRespond(this.server, 200, fixtures['lessons']);
        serverRespond(this.server, 200, fixtures['user_courses']);
        serverRespond(this.server, 200, fixtures['enrollments']);
        view.$('#enroll').click();
        serverRespond(this.server, 200, fixtures['enrollment']);
        expect(view.$el).toContain('#enrolled');
      });

      it('unenrolls user', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        view.$('#enrolled').click();
        serverRespond(this.server, 200, []);
        expect(view.$el).toContain('#enroll');
      });
    });

    describe('Ownership', function() {
      it('shows course action icons for a course owner', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        expect(view.$el).toContain('#course-ownership-delete');
        expect(view.$el).toContain('#course-ownership-edit');
      });

      it('shows lesson action icons for a course owner', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        expect(view.$el).toContain('.listing-lesson .ownership-delete');
        expect(view.$el).toContain('.listing-lesson .ownership-edit');
      });

      it('shows quiz action icons for a course owner', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        expect(view.$el).toContain('.listing-quiz .ownership-delete');
        expect(view.$el).toContain('.listing-quiz .ownership-edit');
      });

      it('does not show action buttons for non-owner', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 2}});
        serverRespond(this.server, 200, {"id":3, "title":"Bear Tendons"})
        serverRespond(this.server, 200, fixtures['quizzes']);
        serverRespond(this.server, 200, fixtures['lessons']);
        serverRespond(this.server, 200, fixtures['user_courses']);
        serverRespond(this.server, 200, fixtures['enrollments']);
        expect(view.$el).not.toContain('#course-ownership-actions');
        expect(view.$el).not.toContain('.ownership-actions');
      });

      it('renders course edit link', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        expect(view.$el.find('#course-ownership-edit').attr('href')).toEqual('/#/courses/1/edit');
      });

      it('renders lesson edit link', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        var edits = view.$el.find('.ownership-edit');
        expect($(edits[0]).attr('href')).toEqual('/#/courses/1/lessons/1/edit');
      });
    });
  });

  // Helper function to send back successful respones for all 3 api calls
  // necessary to render a course overview
  function successServerResponses(server) {
    serverRespond(server, 200, fixtures['course']);
    serverRespond(server, 200, fixtures['quizzes']);
    serverRespond(server, 200, fixtures['lessons']);
    serverRespond(server, 200, fixtures['user_courses']);
    serverRespond(server, 200, fixtures['enrollments']);
  }

});
