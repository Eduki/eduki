/*
 * This describes the behaviors of the front page
 *
 * author: Jolie Chen
 */

describe("Static Index", function() {
  var view;
  setupFakeServer();
  beforeEach(function() {
    currentUser.flush_credentials();
    currentUser.authenticated = false;
    view = new Eduki.Views.StaticIndex();
    view.render();
  });

  afterEach(function() {
    currentUser.flush_credentials();
  });

  describe("Render", function() {
    it("has splash image", function() {
      expect(view.$el).toContain('section');
      expect(view.$el).toContain('#splash-image');
    });

    it("has splash message", function() {
      expect(view.$('#splash-message')).toHaveText('start learning now');
    });

    it("has a signup header", function() {
      expect(view.$el.find('h1')).toHaveText('signup');
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

      it("has a login header", function() {
        expect(view.$el.find('h1')).toHaveText('login');
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

      it("toggles back to signup", function(){
        view.$('#toggle-login').click(); // toggle the login form
        expect(view.$el).toContain('#signup');
      });
    });
  });

  describe("Signup", function() {
    it("signs up successfully and redirects to dashboard", function() {
        spyOn(router, 'route');
        view.$el.find("#email").val("derp@derpette.com");
        view.$el.find("#password").val("test password");
        view.$('#submit-credentials').click();
        serverRespond(this.server, 200, fixtures['user']);
        serverRespond(this.server, 200, fixtures['user']);
        expect(router.route).toHaveBeenCalled();
    });

    it("signs up sends request to right url", function() {
        spyOn(router, 'route');
        view.$el.find("#email").val("derp@derpette.com");
        view.$el.find("#password").val("test password");
        view.$('#submit-credentials').click();
        serverRespond(this.server, 200, fixtures['user']);
        var request = this.server.requests[0];
        expect(request.url).toEqual('/api/users/');
    });

    it("signs up with incorrect email 1", function() {
        view.$el.find("#email").val("derp@");
        view.$el.find("#password").val("test password");
        view.$('#submit-credentials').click();
        expect(view.$el).toContain('.popover');
        expect(view.$('.popover')).toHaveText('Please provide a valid email address');
    });

    it("signs up with incorrect email 2", function() {
        view.$el.find("#email").val("derp@derpette");
        view.$el.find("#password").val("test password");
        view.$('#submit-credentials').click();
        expect(view.$el).toContain('.popover');
        expect(view.$('.popover')).toHaveText('Please provide a valid email address');
    });

    it("signs up with incorrect email 3", function() {
        view.$el.find("#email").val("derp");
        view.$el.find("#password").val("test password");
        view.$('#submit-credentials').click();
        expect(view.$el).toContain('.popover');
        expect(view.$('.popover')).toHaveText('Please provide a valid email address');
    });

    it("signs up with empty password", function() {
        view.$el.find("#email").val("derp@derpette.com");
        view.$el.find("#password").val("");
        view.$('#submit-credentials').click();
        expect(view.$el).toContain('.popover');
        expect(view.$('.popover')).toHaveText('Please provide a password');
    });

    it("signs up with both invalid", function() {
        view.$el.find("#email").val("derprp@");
        view.$el.find("#password").val("");
        view.$('#submit-credentials').click();
        expect(view.$el).toContain('.popover');
        expect(view.$('.popover')).toHaveText('Please provide a valid email address');
    });

    it("signs up with existing email", function() {
        view.$el.find("#email").val("derp@derpette.com");
        view.$el.find("#password").val("test password");
        view.$('#submit-credentials').click();
        serverRespond(this.server, 409, []);
        expect(view.$el).toContain('.popover');
        expect(view.$('.popover')).toHaveText('Email already exists');
    });
  });

  describe("Login", function() {
    describe("not already logged in", function() {
      beforeEach(function() {
        view.$('#toggle-signup').click(); // toggle the login form
        view.$el.find("#email").val("derp@derpette.com");
        view.$el.find("#password").val("test password");
      });
      it("redirects you to the dashboard upon successful login", function() {
        spyOn(router, 'route');
        spyOn(currentUser, "authenticate").andCallFake(function() {
          view.onAuthenticateSuccess();
        });
        view.$("#submit-credentials").click();
        expect(router.route).toHaveBeenCalledWith('/dashboard');
      });

      it("display an error message ", function() {
        spyOn(currentUser, "authenticate").andCallFake(function() {
          view.onAuthenticateFailure();
        });
        view.$("#submit-credentials").click();
        expect(view.$el).toContain('.popover');
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

    });

    describe("already logged in", function() {
      it("redirects you to the dashboard immediately", function() {
        spyOn(router, 'route');
        currentUser.authenticated = true;
        view = new Eduki.Views.StaticIndex();
        view.render();
        expect(router.route).toHaveBeenCalledWith("/dashboard");
      });
    });
  });
});
