// Course_spec describes a test suite for Course related routes
// David Mah
describe('Course', function() {
  describe("Index", function() {
    var server;
    // Setup Fake Server to respond to AJAX requests
    beforeEach(function() {
      server = sinon.fakeServer.create();
    });
    afterEach(function() {
      server.restore();
    });

    it("renders zero courses", function() {
      var view = new Eduki.Views.CoursesIndex();

      server.requests[0].respond(
        200,
        {"Content-Type": "application/json"},
        JSON.stringify([])
      );

      expect(view.$el).not.toContain("li");
    });

    it("renders one course", function() {
      var view = new Eduki.Views.CoursesIndex();

      server.requests[0].respond(
        200,
        {"Content-Type": "application/json"},
        JSON.stringify([{"id":1, "title":"Bear Cooking"}])
      );

      expect(view.$el.find('li')).toHaveText("Bear Cooking");
    });

    it("renders many courses", function() {
      var view = new Eduki.Views.CoursesIndex();

      server.requests[0].respond(
        200,
        {"Content-Type": "application/json"},
        JSON.stringify([{"id":1, "title":"Bear Cooking"},
                        {"id":2, "title":"Petting Zoos"}])
      );
      list_items = view.$el.find('li');
      expect(list_items[0]).toHaveText("Bear Cooking");
      expect(list_items[1]).toHaveText("Petting Zoos");
    });
  });
});
