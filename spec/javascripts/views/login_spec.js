// This describes the behaviors of the login page
// David Mah
describe("Login", function() {
  describe("Render", function() {
    var view;
    beforeEach(function() {
      setupFakeServer();
      view = new Eduki.Views.Login();
      view.render();
    });

    it("has a email field", function() {
      expect(view.$el).toContain("#login-field-email");
      expect(view.$el.find("#login-field-email")).toHaveAttr("type", "text");
    });

    it("has a password field that hides text", function(){
      expect(view.$el.find("#login-field-password")).toHaveAttr("type", "password");
    });

  });
});
