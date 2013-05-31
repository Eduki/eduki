/*
 * dashboard_spec describes a test suite for a dashboard view
 *
 * author: Jolie Chen
 */

describe('Dashboard', function() {
  describe('Overview', function() {
    beforeEach(function() {
      currentUser.id = 1;
      currentUser.authenticated = true;
    });

    setupFakeServer();

    it('renders header', function() {
      var view = new Eduki.Views.Dashboard();
      successServerResponses(this.server);
      expect(view.$el.find('h1')).toHaveText('Your Dashboard');
    });

    it('renders course enrollments', function() {
      var view = new Eduki.Views.Dashboard();
      successServerResponses(this.server);
      expect(view.$el.find('#enrolled-courses h2')).toHaveText('Enrolled Courses');
      expect(view.$el.find('#enrolled-courses-list .row')).toContain('div');
    });

    it('renders no enrollments', function() {
      var view = new Eduki.Views.Dashboard();
      serverRespond(this.server, 200, []);
      serverRespond(this.server, 200, []);
      expect(view.$el.find('#enrolled-courses h2')).toHaveText('You are currently not enrolled in any courses.');
    });

    it('renders two course', function() {
      var view = new Eduki.Views.Dashboard();
      successServerResponses(this.server);
      var courses = view.$el.find('.listing-block');
      expect(courses.length).toBe(1);
    });

    it('renders course titles', function() {
      var view = new Eduki.Views.Dashboard();
      successServerResponses(this.server);
      var courseTitles = view.$el.find('.listing-block h3');
      expect(courseTitles[0]).toHaveText('Bear Cooking');
    });

    it('renders first course link', function() {
      var view = new Eduki.Views.Dashboard();
      successServerResponses(this.server);
      var courseLinks = view.$el.find('.listing-block a');
      expect($(courseLinks[0]).attr('href')).toEqual('/#/courses/1');
    });
  });

  describe("Not Logged in", function() {
    it("redirects you to the front page immediately", function() {
      currentUser.id = -1;
      currentUser.authenticated = false;
      spyOn(router, 'route');
      view = new Eduki.Views.Dashboard();
      view.render();
      expect(router.route).toHaveBeenCalledWith("/");
    });
  });

  // Helper function to send back successful respones for all 3 api calls
  // necessary to render a course overview
  function successServerResponses(server) {
    serverRespond(server, 200, fixtures['enrollments']);
    serverRespond(server, 200, fixtures['courses']);
  }

});

