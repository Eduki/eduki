// This describes the behaviors of the login page
// David Mah
describe("Login", function() {
  beforeEach(function() {
    setupFakeServer();
  });
  describe("Render", function() {
    var view;
    beforeEach(function() {
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
  describe("Authenticate", function() {
    var view;
    beforeEach(function() {
      view = new Eduki.Views.Login();
      view.render();
      view.$el.find("#login-field-email").val("test user");
      view.$el.find("#login-field-password").val("test password");
    });

    it("should send a authentication request to the server with basic auth", function() {
      view.$el.find("#login-button").click();
      var request = this.server.requests[0];
      expect(request.username).toEqual("test user");
      expect(request.password).toEqual("test password");
      expect(request.url).toEqual("/api/authenticate");
    });

    it("should not have error area visible by default", function () {
      expect(view.$el.find("#error-area")).toBeHidden();
    });

    it("should display a loading modal upon click, then disappear after load", function() {
      expect(view.$el).not.toContain("#loading-modal");
      view.$el.find("#login-button").click();
      expect(view.$el).toContain("#loading-modal");
      serverRespond(this.server, 200, fixtures["user"]);
      expect(view.$el).not.toContain("#loading-modal");
    });

    // TODO: Waiting on api auth endpoint to experiment with this properly
    it("should dump an error message on failure", function () {
      view.$el.find("#login-button").click();
      serverRespond(this.server, 403, fixtures["error"]);
      expect(view.$el.find("#error-area")).toHaveCss({display: "block"});
    });

  });
});
