/*
 * lesson_spec is a test suite for a lesson's page
 *
 * author: Jolie Chen
 */

describe('Lesson', function() {
  var view;
  setupFakeServer();
  beforeEach(function() {
    currentUser.id = -1;
    currentUser.authenticated = false;
  	view = new Eduki.Views.LessonsLesson({attributes:{course_id: 1, lesson_id: 1}});
    view.render();
  });
  describe("Show", function() {

    it("renders error page", function() {
      spyOn(router, 'route')
      serverRespond(this.server, 401, fixtures['course']);
      expect(router.route).toHaveBeenCalledWith('/error');
    });

    it("renders course home link", function() {
      successServerResponses(this.server);
      expect(view.$el).toContain('#course-home');
    });

    it("renders course link", function() {
      successServerResponses(this.server);
      expect(view.$el.find('#course-home a').attr('href')).toEqual('/#/courses/1');
    });

    it("renders lesson title", function() {
      successServerResponses(this.server);
      expect(view.$el.find('h1')).toHaveText('Chopping Liver');
    });

    it("renders lesson body", function() {
      successServerResponses(this.server);
      expect(view.$el).toContain('#lesson-body');
    });

    it("renders lessons list", function() {
      successServerResponses(this.server);
      expect(view.$el.find('#lessons')).toContain('.listing-line');
    });

    it("renders all lessons for that course", function() {
      successServerResponses(this.server);
      var lessons = view.$el.find('#lessons .listing-lesson');
      expect(lessons.length).toBe(3);
    });

    it("doesn't renders ownership", function() {
      successServerResponses(this.server);
      var lessons = view.$el.find('#lessons .listing-lesson');
      expect(view.$el.find('#lesson')).not.toContain('#lesson-ownership-actions');
    });

    it("renders lessons title", function() {
      successServerResponses(this.server);
      var lessons = view.$el.find('#lessons .listing-lesson > a');
      expect(lessons[1]).toHaveText('Chopping Tongue');
    });

    it("renders lessons link", function() {
      successServerResponses(this.server);
      var lessons = view.$el.find('#lessons .listing-lesson > a');
      expect($(lessons[1]).attr('href')).toEqual('/#/courses/1/lessons/2');
    });

    describe("Ownership", function() {
      beforeEach(function() {
        currentUser.id = 1;
        currentUser.authenticated = true;
      });

      it("renders ownership", function() {
        successServerResponsesOwnership(this.server);
        var lessons = view.$el.find('#lessons .listing-lesson');
        expect(view.$el.find('#lesson')).toContain('#lesson-ownership-actions');
      });

      it("renders ownership actions", function() {
        successServerResponsesOwnership(this.server);
        var lessons = view.$el.find('#lessons .listing-lesson');
        var actions = view.$('#lesson-ownership-actions').children();
        expect($(actions[0]).attr('id')).toEqual('lesson-ownership-delete');
        expect($(actions[1]).attr('href')).toEqual('/#/courses/1/lessons/1/edit');
      });

      it("shows modal for deletion", function() {
        successServerResponsesOwnership(this.server);
        var lessons = view.$el.find('#lessons .listing-lesson');
        var actions = view.$('#lesson-ownership-actions').children();
        $(actions[0]).click();
        expect(view.$el).toContain('#delete-confirmation-modal');
      });

      it("deletes lesson", function() {
        spyOn(router, 'route');
        successServerResponsesOwnership(this.server);
        var lessons = view.$el.find('#lessons .listing-lesson');
        var actions = view.$('#lesson-ownership-actions').children();
        $(actions[0]).click();
        view.$('#delete').click();
        serverRespond(this.server, 200, []);
        expect(router.route).toHaveBeenCalledWith('/courses/1');
      });
    });
  });

  // Helper function to send back successful respones for the 2 api calls
  // necessary to render a lesson
  function successServerResponses(server) {
    serverRespond(server, 200, fixtures['course']);
    serverRespond(server, 200, fixtures['lesson']);
    serverRespond(server, 200, fixtures['lessons']);
  }

  function successServerResponsesOwnership(server) {
    serverRespond(server, 200, fixtures['course']);
    serverRespond(server, 200, fixtures['lesson']);
    serverRespond(server, 200, fixtures['lessons']);
    serverRespond(server, 200, fixtures['courses']);
    serverRespond(server, 200, fixtures['enrollments']);
  }

});
