/*
 * lesson_spec is a test suite for a lesson's page
 *
 * author: Jolie Chen
 */

describe('Lesson', function() {
  var view;
  setupFakeServer();
  beforeEach(function() {
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
  });

  // Helper function to send back successful respones for the 2 api calls
  // necessary to render a lesson
  function successServerResponses(server) {
    serverRespond(server, 200, fixtures['course']);
    serverRespond(server, 200, fixtures['lesson']);
    serverRespond(server, 200, fixtures['lessons']);
  }

});
