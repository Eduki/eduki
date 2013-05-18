// Course_spec describes a test suite for Course related routes
// David Mah
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
      expect(view.$el.find('li')).toHaveText("Bear Cooking");
    });

    it("renders many courses", function() {
      var view = new Eduki.Views.CoursesIndex();
      serverRespond(this.server, 200, fixtures["courses"]);
      list_items = view.$el.find('li');
      expect(list_items[0]).toHaveText("Bear Cooking");
      expect(list_items[1]).toHaveText("Petting Zoos");
    });
  });
});
