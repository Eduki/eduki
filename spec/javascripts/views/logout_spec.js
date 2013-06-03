/*
 * Describes behavior for user logout
 */

describe("Logout", function() {
  setupFakeServer();
  beforeEach(function() {
    currentUser.flush_credentials();
    currentUser.authenticated = false;
    // render navigation bar
    navbar = new Eduki.Views.Navbar();
    navbar.render();
  });

  describe("Renders", function() {
    describe("Front page", function() {
      it('renders no log out button', function() {
        expect(navbar.$el).not.toContain('#navbar-logout');
      });

      it('appends log out button upon signup', function() {
        var index = new Eduki.Views.StaticIndex();
        spyOn(index, 'appendLogout');
        index.render();
        index.$el.find("#email").val("derp@derpette.com");
        index.$el.find("#password").val("test password");
        index.$('#submit-credentials').click();
        serverRespond(this.server, 200, fixtures['user']);
        serverRespond(this.server, 200, fixtures['user']);
        expect(index.appendLogout).toHaveBeenCalled();
      });

      it('appends logout button upon login', function() {
        var index = new Eduki.Views.StaticIndex();
        index.render();
        spyOn(index, 'appendLogout');
        index.$('#toggle-signup').click(); // toggle the login form
        index.$el.find("#email").val("derp@derpette.com");
        index.$el.find("#password").val("test password");
        spyOn(currentUser, "authenticate").andCallFake(function() {
          index.onAuthenticateSuccess();
        });
        index.$("#submit-credentials").click();
        expect(index.appendLogout).toHaveBeenCalled();
      });
    });

    describe("Other pages", function() {
      it('renders logout if user is logged in', function() {
        currentUser.authenticated = true;
        navbar.render();
        var view = new Eduki.Views.CoursesIndex();
        view.render();
        expect(navbar.$el).toContain('#navbar-logout');
      });

      it('renders no logout if user is not logged in', function() {
        currentUser.authenticated = false;
        navbar.render();
        var view = new Eduki.Views.CoursesIndex();
        view.render();
        expect(navbar.$el).not.toContain('#navbar-logout');
      });
    });
  });

  describe("Logout user", function() {
    it('redirects to home page', function() {
      currentUser.authenticated = true;
      navbar.render();
      spyOn(router, 'redirect');
      navbar.$('#navbar-logout').click();
      expect(router.redirect).toHaveBeenCalledWith('/');
    });

    it('wipes credentials', function() {
      currentUser.authenticated = true;
      navbar.render();
      spyOn(router, 'redirect');
      navbar.$('#navbar-logout').click();
      expect(currentUser.id).toBe(-1);
      expect(currentUser.authenticated).toBe(false);
    });
  });
});
