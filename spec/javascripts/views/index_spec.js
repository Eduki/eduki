/*
 * This describes the behaviors of the front page
 *
 * author: Jolie Chen
 */

describe("Static Index", function() {
  beforeEach(function() {
    setupFakeServer();
    currentUser.authenticated = false;
  });
  describe("Authenticate", function() {
    describe("not already logged in", function() {
      var view;
      beforeEach(function() {
        view = new Eduki.Views.StaticIndex();
        view.render();
        view.$('#toggle-signup').click(); // toggle the login form
        view.$el.find("#email").val("derp@derpette.com");
        view.$el.find("#password").val("test password");
      });

      // TODO: Auth should Use actual AJAX request. Pending on API auth
      // it("should send a authentication request to the server with basic auth", function() {
      //   view.$el.find("#login-button").click();
      //   var request = this.server.requests[0];
      //   expect(request.username).toEqual("test user");
      //   expect(request.password).toEqual("test password");
      //   expect(request.url).toEqual("/api/authenticate");
      // });

      // it("should display a loading modal upon click, then disappear after load", function() {
      //   expect(view.$el).not.toContain("#loading-modal");
      //   view.$el.find("#login-button").click();
      //   expect(view.$el).toContain("#loading-modal");
      //   serverRespond(this.server, 200, fixtures["user"]);
      //   expect(view.$el).not.toContain("#loading-modal");
      // });

      it("redirects you to the dashboard upon successful login", function() {
        spyOn(router, 'route');
        view.$("#submit-credentials").click();
        // serverRespond(this.server, 200, fixtures["user"]);
        //expect(router.route).toHaveBeenCalledWith("/dashboard");
        expect(router.route).toHaveBeenCalled();
      });

      // it("should dump an error message on failure", function () {
      //   view.$el.find("#login-button").click();
      //   serverRespond(this.server, 403, fixtures["error"]);
      //   expect(view.$el.find("#error-area")).toHaveCss({display: "block"});
      // });
    });

    describe("Already logged in", function() {
      it("redirects you to the dashboard immediately", function() {
        spyOn(router, 'route');
        currentUser.authenticated = true;
        view = new Eduki.Views.StaticIndex();
        view.render();
        expect(router.route).toHaveBeenCalledWith("/dashboard");
      });
    });
  });

  describe("Render", function() {
    var view;
    beforeEach(function() {
      view = new Eduki.Views.StaticIndex();
      view.render();
    });

    it("has a signup form", function() {
      expect(view.$el).toContain('#signup');
    });

    it("has a signup toggle", function() {
      expect(view.$el).toContain('#toggle-signup');
    });

    it("has a signup button", function() {
      expect(view.$el).toContain('#submit-credentials');
    });

    it("has a signup fields", function() {
      expect(view.$el).toContain('#email');
      expect(view.$el).toContain('#password');
    });

    it("has a password field that hides text", function(){
      expect(view.$el.find("#password")).toHaveAttr("type", "password");
    });

    describe("Toggle Login", function() {
      beforeEach(function() {
        view.$('#toggle-signup').click(); // toggle the login form
      });

      it("has a login form", function() {
        expect(view.$el).toContain('#login');
      });

      it("has a login toggle", function() {
        expect(view.$el).toContain('#toggle-login');
      });

      it("has a login button", function() {
        expect(view.$el).toContain('#submit-credentials');
      });

      it("has a login fields", function() {
        expect(view.$el).toContain('#email');
        expect(view.$el).toContain('#password');
      });

      it("has a password field that hides text", function(){
        expect(view.$el.find("#password")).toHaveAttr("type", "password");
      });
    });
  });
});
