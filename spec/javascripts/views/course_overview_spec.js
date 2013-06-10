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
      view.render();
      spyOn(router, 'route');
      serverRespond(this.server, 404, fixtures['course']);
      expect(router.route).toHaveBeenCalledWith('/error');
    });

    it('renders course title', function() {
      var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
      view.render();
      successServerResponses(this.server);
      expect(view.$el.find('h1').html()).toMatch('Bear Cooking');
    });

    it('renders quiz create button', function() {
      var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
      view.render();
      successServerResponses(this.server);
      expect(view.$el).toContain('#quiz-create');
    });

    it('renders lesson create button', function() {
      var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
      view.render();
      successServerResponses(this.server);
      expect(view.$el).toContain('#lesson-create');
    });

    it('renders message if there are no lessons', function() {
      var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
      view.render();
      serverRespond(this.server, 200, fixtures['course']);
      serverRespond(this.server, 200, fixtures['quizzes']);
      serverRespond(this.server, 200, []);
      serverRespond(this.server, 200, fixtures['user_courses']);
      serverRespond(this.server, 200, fixtures['enrollments']);
      expect(view.$('#course-lessons p').html()).toMatch('Looks like there aren\'t any lessons yet!');
    });

    it('renders message if there are no quizzes', function() {
      var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
      view.render();
      serverRespond(this.server, 200, fixtures['course']);
      serverRespond(this.server, 200, []);
      serverRespond(this.server, 200, fixtures['lessons']);
      serverRespond(this.server, 200, fixtures['user_courses']);
      serverRespond(this.server, 200, fixtures['enrollments']);
      expect(view.$('#course-quizzes p').html()).toMatch('Looks like there aren\'t any quizzes yet!');
    });

    // Tests for lessons
    describe('Lessons', function() {
      it("renders lessons list", function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        successServerResponses(this.server);
        expect(view.$el.find('#course-lessons')).toContain('li');
      });

      it('renders all lessons for that course', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        successServerResponses(this.server);
        var lessons = view.$el.find('.listing-lesson > a');
        expect(lessons.length).toBe(3);
      });

      it('renders lessons title', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        successServerResponses(this.server);
        var lessons = view.$el.find('.listing-lesson > a');
        expect(lessons[1]).toHaveText('Chopping Tongue');
      });

      it('renders lessons link', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        successServerResponses(this.server);
        var lessons = view.$el.find('.listing-lesson > a');
        expect($(lessons[1]).attr('href')).toEqual('/#/courses/1/lessons/2');
      });

      it('renders message if there are no lessons for a non-logged in user', function() {
        currentUser.authenticated = false;
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        serverRespond(this.server, 200, fixtures['course']);
        serverRespond(this.server, 200, fixtures['quizzes']);
        serverRespond(this.server, 200, []);
        expect(view.$('#course-lessons p').html()).toMatch('Looks like there aren\'t any lessons yet!');
      });
    });

    // Tests for quizzes
      describe('Quizzes', function() {
      it('renders quizzes list', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        successServerResponses(this.server);
        expect(view.$el.find('#course-quizzes')).toContain('li');
      });

      it('renders all quizzes for that course', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        successServerResponses(this.server);
        var quizzes = view.$el.find('.listing-quiz > a');
        expect(quizzes.length).toBe(3);
      });

      it('renders quiz title', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        successServerResponses(this.server);
        var quizzes = view.$el.find('.listing-quiz > a');
        expect(quizzes[1]).toHaveText('Quiz 2');
      });

      it('renders quiz link', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        successServerResponses(this.server);
        var quizzes = view.$el.find('.listing-quiz > a');
        expect($(quizzes[1]).attr('href')).toEqual('/#/courses/1/quizzes/2');
      });

      it('renders message for user to log in to take quizzes', function() {
        currentUser.authenticated = false;
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        serverRespond(this.server, 200, fixtures['course']);
        serverRespond(this.server, 200, fixtures['quizzes']);
        serverRespond(this.server, 200, []);
        expect(view.$('#course-quizzes p').html()).toEqual('Please <a href="/" alt="Home">log in</a> to view quizzes');
      });
    });

    describe('Enrollments', function() {
      it('renders enroll button', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 2}});
        view.render();
        serverRespond(this.server, 200, {"id":2, "title":"Bear Cooking"});
        serverRespond(this.server, 200, fixtures['quizzes']);
        serverRespond(this.server, 200, fixtures['lessons']);
        serverRespond(this.server, 200, fixtures['enrollments']);
        expect(view.$el).toContain('#enroll');
      });

      it('renders enrolled button', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        successServerResponses(this.server);
        expect(view.$el).toContain('#enrolled');
      });

      it('doesn\'t render button for user not logged in', function() {
        currentUser.authenticated = false;
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 2}});
        view.render();
        serverRespond(this.server, 200, fixtures['course']);
        serverRespond(this.server, 200, fixtures['quizzes']);
        serverRespond(this.server, 200, fixtures['lessons']);
        expect(view.$('h1')).not.toContain('button');
      });

      it('enrolls user', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 2}});
        view.render();
        serverRespond(this.server, 200, {"id":3, "title":"Bear Cooking"});
        serverRespond(this.server, 200, fixtures['quizzes']);
        serverRespond(this.server, 200, fixtures['lessons']);
        serverRespond(this.server, 200, fixtures['user_courses']);
        serverRespond(this.server, 200, fixtures['enrollments']);
        view.$('#enroll').click();
        serverRespond(this.server, 200, fixtures['enrollment']);
        expect(view.$el).toContain('#enrolled');
      });

      it('shows unenrolls modal', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        view.$('#enrolled').click();
        expect(view.$el).toContain('#unenroll-confirmation-modal');
        expect(view.$el).toContain('#unenroll');
        expect(view.$el).toContain('#cancel');
      });

      it('unenrolls user', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        successServerResponses(this.server);
        view.$('#enrolled').click();
        view.$('#unenroll').click();
        serverRespond(this.server, 200, []);
        expect(view.$el).toContain('#enroll');
      });

      it('doesn\'t unenrolls user', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        successServerResponses(this.server);
        view.$('#enrolled').click();
        view.$('#cancel').click();
        expect(view.$el).toContain('#enrolled');
      });
    });

    describe('Ownership', function() {
      it('shows course action icons for a course owner', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        successServerResponses(this.server);
        expect(view.$el).toContain('#course-ownership-delete');
        expect(view.$el).toContain('#course-ownership-edit');
      });

      it('shows lesson action icons for a course owner', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        successServerResponses(this.server);
        expect(view.$el).toContain('.listing-lesson .ownership-delete');
        expect(view.$el).toContain('.listing-lesson .ownership-edit');
        expect(view.$el).toContain('#lesson-create');
      });

      it('shows quiz action icons for a course owner', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        successServerResponses(this.server);
        expect(view.$el).toContain('.listing-quiz .ownership-delete');
        expect(view.$el).toContain('.listing-quiz .ownership-edit');
        expect(view.$el).toContain('#quiz-create');
      });

      it('does not show action buttons for non-owner', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 2}});
        view.render();
        serverRespond(this.server, 200, {"id":3, "title":"Bear Tendons"})
        serverRespond(this.server, 200, fixtures['quizzes']);
        serverRespond(this.server, 200, fixtures['lessons']);
        serverRespond(this.server, 200, fixtures['user_courses']);
        serverRespond(this.server, 200, fixtures['enrollments']);
        expect(view.$el).not.toContain('#course-ownership-actions');
        expect(view.$el).not.toContain('.ownership-actions');
        expect(view.$el).not.toContain('#lesson-create');
        expect(view.$el).not.toContain('#quiz-create');
      });

      it('renders course edit link', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        successServerResponses(this.server);
        expect(view.$el.find('#course-ownership-edit').attr('href')).toEqual('/#/courses/1/edit');
      });

      it('renders lesson edit link', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        successServerResponses(this.server);
        var edits = view.$el.find('.ownership-edit');
        expect($(edits[0]).attr('href')).toEqual('/#/courses/1/lessons/1/edit');
      });

      it('renders create message if there are no lessons', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        serverRespond(this.server, 200, fixtures['course']);
        serverRespond(this.server, 200, fixtures['quizzes']);
        serverRespond(this.server, 200, []);
        serverRespond(this.server, 200, fixtures['user_courses']);
        serverRespond(this.server, 200, fixtures['enrollments']);
        expect(view.$('#course-lessons p a').html()).toEqual('Create one now.');
      });

      it('renders message if there are no quizzes', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        serverRespond(this.server, 200, fixtures['course']);
        serverRespond(this.server, 200, []);
        serverRespond(this.server, 200, fixtures['lessons']);
        serverRespond(this.server, 200, fixtures['user_courses']);
        serverRespond(this.server, 200, fixtures['enrollments']);
        expect(view.$('#course-quizzes p a').html()).toEqual('Create one now.');
      });

      it('does not renders create lesson message for non-owner', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        serverRespond(this.server, 200, {"id":3, "title":"Bear Tendons"})
        serverRespond(this.server, 200, fixtures['quizzes']);
        serverRespond(this.server, 200, []);
        serverRespond(this.server, 200, fixtures['user_courses']);
        serverRespond(this.server, 200, fixtures['enrollments']);
        expect(view.$('#course-lessons')).not.toContain('p a');
      });

      it('does not renders create quiz message for non-owner', function() {
        var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
        view.render();
        serverRespond(this.server, 200, {"id":3, "title":"Bear Tendons"})
        serverRespond(this.server, 200, []);
        serverRespond(this.server, 200, fixtures['lessons']);
        serverRespond(this.server, 200, fixtures['user_courses']);
        serverRespond(this.server, 200, fixtures['enrollments']);
        expect(view.$('#course-quizzes')).not.toContain('p a');
      });
    });

    describe('Delete', function() {
      describe('Course', function() {
        it('shows modal when course delete is clicked', function() {
          var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
          view.render();
          successServerResponses(this.server);
          view.$('#course-ownership-delete').click();
          expect(view.$el).toContain('#delete-confirmation-modal');
          expect(view.$el).toContain('#delete');
          expect(view.$el).toContain('#cancel');
        });

        it('shows course title in modal', function() {
          var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
          view.render();
          successServerResponses(this.server);
          view.$('#course-ownership-delete').click();
          expect(view.$('#confirmation-message big').html()).toEqual('Are you sure you want to delete <strong>Bear Cooking</strong>?');
        });

        it('correct url to delete course', function() {
          var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
          view.render();
          spyOn($, 'ajax').andCallThrough();
          successServerResponses(this.server);
          view.$('#course-ownership-delete').click();
          view.$('#delete').click();
          expect($.ajax.mostRecentCall.args[0]['url']).toEqual('/api/courses/1');
          expect($.ajax.mostRecentCall.args[0]['type']).toEqual('DELETE');
        });

        it('redirects to courses index after deletion', function() {
          var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
          view.render();
          spyOn(router, 'route');
          successServerResponses(this.server);
          view.$('#course-ownership-delete').click();
          view.$('#delete').click();
          serverRespond(this.server, 200, []);
          expect(router.route).toHaveBeenCalledWith('/courses');
        });

        it('removes all quizzes', function() {
          var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
          successServerResponses(this.server);
          var deleteButtons = view.$el.find('#course-quizzes .ownership-delete');
          $(deleteButtons[0]).click();
          view.$('#delete').click();
          serverRespond(this.server, 200, []);
          $(deleteButtons[1]).click();
          view.$('#delete').click();
          serverRespond(this.server, 200, []);
          $(deleteButtons[2]).click();
          view.$('#delete').click();
          serverRespond(this.server, 200, []);
          expect(view.$el).toContain('#course-quizzes > p');
          expect(view.$el).not.toContain('.listing-quiz');
        });
      });

      describe('Lesson', function() {
        it('shows modal when lesson delete button is clicked', function() {
          var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
          view.render();
          successServerResponses(this.server);
          var deleteButtons = view.$el.find('.ownership-delete');
          $(deleteButtons[0]).click();
          expect(view.$el).toContain('#delete-confirmation-modal');
          expect(view.$el).toContain('#delete');
          expect(view.$el).toContain('#cancel');
        });

        it('shows lesson title in modal', function() {
          var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
          view.render();
          successServerResponses(this.server);
          var deleteButtons = view.$el.find('.ownership-delete');
          $(deleteButtons[0]).click();
          expect(view.$('#confirmation-message big').html()).toEqual('Are you sure you want to delete <strong>Chopping Liver</strong>?');
        });

        it('correct url to delete lesson', function() {
          var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
          view.render();
          spyOn($, 'ajax').andCallThrough();
          successServerResponses(this.server);
          var deleteButtons = view.$el.find('.ownership-delete');
          $(deleteButtons[0]).click();
          view.$('#delete').click();
          expect($.ajax.mostRecentCall.args[0]['url']).toEqual('/api/lessons/1');
          expect($.ajax.mostRecentCall.args[0]['type']).toEqual('DELETE');
        });

        it('removes lesson', function() {
          var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
          view.render();
          successServerResponses(this.server);
          var deleteButtons = view.$el.find('.ownership-delete');
          var lessons = view.$el.find('.listing-lesson');
          expect(view.$el).toContain(deleteButtons[0]);
          expect(view.$el).toContain(lessons[0]);
          $(deleteButtons[0]).click();
          view.$('#delete').click();
          serverRespond(this.server, 200, []);
          expect(view.$el).not.toContain(deleteButtons[0]);
          expect(view.$el).not.toContain(lessons[0]);
        });

        it('removes all lessons', function() {
          var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
          successServerResponses(this.server);
          var deleteButtons = view.$el.find('#course-lessons .ownership-delete');
          $(deleteButtons[0]).click();
          view.$('#delete').click();
          serverRespond(this.server, 200, []);
          $(deleteButtons[1]).click();
          view.$('#delete').click();
          serverRespond(this.server, 200, []);
          $(deleteButtons[2]).click();
          view.$('#delete').click();
          serverRespond(this.server, 200, []);
          expect(view.$el).toContain('#course-lessons > p > a');
          expect(view.$el).not.toContain('.listing-lesson');
        });
      });

      describe('Quiz', function() {
        it('shows modal when quiz delete button is clicked', function() {
          var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
          view.render();
          successServerResponses(this.server);
          var deleteButtons = view.$el.find('.ownership-delete');
          $(deleteButtons[3]).click();
          expect(view.$el).toContain('#delete-confirmation-modal');
          expect(view.$el).toContain('#delete');
          expect(view.$el).toContain('#cancel');
        });

        it('shows quiz title in modal', function() {
          var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
          view.render();
          successServerResponses(this.server);
          var deleteButtons = view.$el.find('.ownership-delete');
          $(deleteButtons[3]).click();
          expect(view.$('#confirmation-message big').html()).toEqual('Are you sure you want to delete <strong>Quiz 1</strong>?');
        });

        it('correct url to delete quiz', function() {
          var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
          view.render();
          spyOn($, 'ajax').andCallThrough();
          successServerResponses(this.server);
          var deleteButtons = view.$el.find('.ownership-delete');
          $(deleteButtons[3]).click();
          view.$('#delete').click();
          expect($.ajax.mostRecentCall.args[0]['url']).toEqual('/api/quizzes/1');
          expect($.ajax.mostRecentCall.args[0]['type']).toEqual('DELETE');
        });

        it('removes quiz', function() {
          var view = new Eduki.Views.CoursesOverview({attributes:{course_id: 1}});
          view.render();
          successServerResponses(this.server);
          var quizzes = view.$el.find('.listing-quiz');
          var deleteButtons = view.$el.find('.ownership-delete');
          expect(view.$el).toContain(quizzes[0]);
          expect(view.$el).toContain(deleteButtons[3]);
          $(deleteButtons[3]).click();
          view.$('#delete').click();
          serverRespond(this.server, 200, []);
          expect(view.$el).not.toContain(quizzes[0]);
          expect(view.$el).not.toContain(deleteButtons[3]);
        });
      });
    });
  });

  // Helper function to send back successful respones for all api calls
  // necessary to render a course overview
  function successServerResponses(server) {
    serverRespond(server, 200, fixtures['course']);
    serverRespond(server, 200, fixtures['quizzes']);
    serverRespond(server, 200, fixtures['lessons']);
    serverRespond(server, 200, fixtures['user_courses']);
    serverRespond(server, 200, fixtures['enrollments']);
  }

});
