/*
 * Course_spec describes a test suite for Course related routes

 * author: David Mah
 */
 
describe('Course', function() {
  describe("Index", function() {
    setupFakeServer();
    it("renders zero courses", function() {
      var view = new Eduki.Views.CoursesIndex();
      serverRespond(this.server, 200, []);
      expect(view.$el).not.toContain("li");
    });

    it("renders one course", function() {
      var view = new Eduki.Views.CoursesIndex();
      serverRespond(this.server, 200, fixtures["course"]);
      expect(view.$el.find('.listing-course')).toHaveText("Bear Cooking");
    });

    it("renders one course's link", function() {
      var view = new Eduki.Views.CoursesIndex();
      serverRespond(this.server, 200, fixtures["course"]);
      expect(view.$el.find('.listing-course a').attr('href')).toEqual("/#/courses/1");
    });

    it("renders many courses", function() {
      var view = new Eduki.Views.CoursesIndex();
      serverRespond(this.server, 200, fixtures["courses"]);
      courses = view.$el.find('.listing-course');
      expect(courses[0]).toHaveText("Bear Cooking");
      expect(courses[1]).toHaveText("Petting Zoos");
    });

    it("renders only one row", function() {
      var view = new Eduki.Views.CoursesIndex();
      serverRespond(this.server, 200, fixtures["courses"]);
      courses = view.$el.find('#courses .row');
      expect(courses.length).toBe(1);
    });
  });
});
