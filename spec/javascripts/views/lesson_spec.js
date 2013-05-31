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

    it("renders course title", function() {
      var view = new Eduki.Views.LessonsLesson({attributes:{course_id: 1, lesson_id: 1}});
      successServerResponses(this.server);
      expect(view.$el.find('h1').html()).toMatch('Bear Cooking');
    });

    it("renders course link", function() {
      var view = new Eduki.Views.LessonsLesson({attributes:{course_id: 1, lesson_id: 1}});
      successServerResponses(this.server);
      expect(view.$el.find('h1 a').attr('href')).toEqual('/#/courses/1');
    });

    it("renders lesson title", function() {
      var view = new Eduki.Views.LessonsLesson({attributes:{course_id: 1, lesson_id: 1}});
      successServerResponses(this.server);
      var h2s = view.$el.find('h2');
      expect(h2s[0]).toHaveText('Chopping Liver');
    });

    it("renders lesson body", function() {
      var view = new Eduki.Views.LessonsLesson({attributes:{course_id: 1, lesson_id: 1}});
      successServerResponses(this.server);
      var h2s = view.$el.find('.lesson p');
      expect(view.$el.find('.lesson p')).toHaveText('Derp');
    });

    it("renders other lessons header", function() {
      var view = new Eduki.Views.LessonsLesson({attributes:{course_id: 1, lesson_id: 1}});
      successServerResponses(this.server);
      var h2s = view.$el.find('h2');
      expect(h2s[1]).toHaveText('Lessons');
    });

    it("renders lessons list", function() {
      var view = new Eduki.Views.LessonsLesson({attributes:{course_id: 1, lesson_id: 1}});
      successServerResponses(this.server);
      expect(view.$el.find('#course-lessons')).toContain('li');
    });

    it("renders all lessons for that course", function() {
      var view = new Eduki.Views.LessonsLesson({attributes:{course_id: 1, lesson_id: 1}});
      successServerResponses(this.server);
      var lessons = view.$el.find('#course-lessons li a');
      expect(lessons.length).toBe(3);
    });

    it("renders lessons title", function() {
      var view = new Eduki.Views.LessonsLesson({attributes:{course_id: 1, lesson_id: 1}});
      successServerResponses(this.server);
      var lessons = view.$el.find('#course-lessons li a');
      expect(lessons[1]).toHaveText('Chopping Tongue');
    });

    it("renders lessons link", function() {
      var view = new Eduki.Views.LessonsLesson({attributes:{course_id: 1, lesson_id: 1}});
      successServerResponses(this.server);
      var lessons = view.$el.find('#course-lessons li a');
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
