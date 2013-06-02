/*
 * lesson_spec is a test suite for a lesson's page
 *
 * author: Jolie Chen
 */

describe('Lesson', function() {
  describe("Show", function() {
    setupFakeServer();

    it("renders error page", function() {
      var view = new Eduki.Views.LessonsLesson({attributes:{course_id: 1, lesson_id: 1}});
      serverRespond(this.server, 401, fixtures['course']);
      expect(view.$el.find('h1')).toHaveText('Woops! Something went wrong.');
    });

    it("renders course home link", function() {
      var view = new Eduki.Views.LessonsLesson({attributes:{course_id: 1, lesson_id: 1}});
      successServerResponses(this.server);
      expect(view.$el).toContain('#course-home');
    });

    it("renders course link", function() {
      var view = new Eduki.Views.LessonsLesson({attributes:{course_id: 1, lesson_id: 1}});
      successServerResponses(this.server);
      expect(view.$el.find('#course-home a').attr('href')).toEqual('/#/courses/1');
    });

    it("renders lesson title", function() {
      var view = new Eduki.Views.LessonsLesson({attributes:{course_id: 1, lesson_id: 1}});
      successServerResponses(this.server);
      expect(view.$el.find('h1')).toHaveText('Chopping Liver');
    });

    it("renders lesson body", function() {
      var view = new Eduki.Views.LessonsLesson({attributes:{course_id: 1, lesson_id: 1}});
      successServerResponses(this.server);
      expect(view.$el).toContain('#lesson-body');
    });

    it("renders lessons list", function() {
      var view = new Eduki.Views.LessonsLesson({attributes:{course_id: 1, lesson_id: 1}});
      successServerResponses(this.server);
      expect(view.$el.find('#lessons')).toContain('.listing-line');
    });

    it("renders all lessons for that course", function() {
      var view = new Eduki.Views.LessonsLesson({attributes:{course_id: 1, lesson_id: 1}});
      successServerResponses(this.server);
      var lessons = view.$el.find('#lessons .listing-lesson');
      expect(lessons.length).toBe(3);
    });

    it("renders lessons title", function() {
      var view = new Eduki.Views.LessonsLesson({attributes:{course_id: 1, lesson_id: 1}});
      successServerResponses(this.server);
      var lessons = view.$el.find('#lessons .listing-lesson > a');
      expect(lessons[1]).toHaveText('Chopping Tongue');
    });

    it("renders lessons link", function() {
      var view = new Eduki.Views.LessonsLesson({attributes:{course_id: 1, lesson_id: 1}});
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
