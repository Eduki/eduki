/*
 * dashboard_spec describes a test suite for a dashboard view
 *
 * author: Jolie Chen
 */

describe('Dashboard', function() {
  describe('Overview', function() {
    beforeEach(function() {
      currentUser.flush_credentials();
      currentUser.id = 1;
      currentUser.authenticated = true;
    });

    setupFakeServer();

    it('renders header for user with first name', function() {
      var view = new Eduki.Views.Dashboard();
      successServerResponses(this.server);
      expect(view.$el.find('h1')).toHaveText("derp\'s Dashboard");
    });

    it('renders header for user where first name is empty string', function() {
      var view = new Eduki.Views.Dashboard();
      serverRespond(this.server, 200, {id:1, first_name: '', last_name: '',
                                       email: '', background: ''});
      serverRespond(this.server, 200, ['enrollments']);
      serverRespond(this.server, 200, ['user_courses']);
      serverRespond(this.server, 200, ['courses']);
      expect(view.$el.find('h1')).toHaveText("Your Dashboard");
    });

    it('renders header for user where first name is null', function() {
      var view = new Eduki.Views.Dashboard();
      serverRespond(this.server, 200, {id:1, first_name: null, last_name: '',
                                       email: '', background: ''});
      serverRespond(this.server, 200, ['enrollments']);
      serverRespond(this.server, 200, ['user_courses']);
      serverRespond(this.server, 200, ['courses']);
      expect(view.$el.find('h1')).toHaveText("Your Dashboard");
    });

    it('renders course enrollments', function() {
      var view = new Eduki.Views.Dashboard();
      successServerResponses(this.server);
      expect(view.$el.find('#enrolled-courses h2')).toHaveText('Enrolled Courses');
      expect(view.$el).toContain('.listing-enrolled-course');
    });

    it('renders owned courses', function() {
      var view = new Eduki.Views.Dashboard();
      successServerResponses(this.server);
      expect(view.$el.find('#enrolled-courses h2')).toHaveText('Enrolled Courses');
      expect(view.$el).toContain('.listing-owned-course');
    });

    it('renders no enrollments', function() {
      var view = new Eduki.Views.Dashboard();
      serverRespond(this.server, 200, []);
      serverRespond(this.server, 200, []);
      serverRespond(this.server, 200, []);
      serverRespond(this.server, 200, []);
      expect(view.$el.find('#enrolled-courses h2')).toHaveText('You are currently not enrolled in any courses.');
    });

    it('renders no owned courses', function() {
      var view = new Eduki.Views.Dashboard();
      serverRespond(this.server, 200, fixtures['user']);
      serverRespond(this.server, 200, fixtures['enrollments']);
      serverRespond(this.server, 200, []);
      serverRespond(this.server, 200, fixtures['courses']);
      expect(view.$el.find('#owned-courses h2')).toHaveText('You have not created any courses.');
    });

    it('renders two enrollments', function() {
      var view = new Eduki.Views.Dashboard();
      successServerResponses(this.server);
      var courses = view.$el.find('.listing-enrolled-course');
      expect(courses.length).toBe(2);
    });

    it('renders first overlay', function() {
      var view = new Eduki.Views.Dashboard();
      successServerResponses(this.server);
      var icons = view.$el.find('.enrolled-icons a');
      expect($(icons[0]).attr('href')).toEqual('/#/courses/1');
      expect($(icons[1]).attr('href')).toEqual('/#/user/enrollment/1/quizzes');
    });

    it('renders second overlay', function() {
      var view = new Eduki.Views.Dashboard();
      successServerResponses(this.server);
      var icons = view.$el.find('.enrolled-icons a');
      expect($(icons[2]).attr('href')).toEqual('/#/courses/2');
      expect($(icons[3]).attr('href')).toEqual('/#/user/enrollment/2/quizzes');
    });

    it('renders one owned courses', function() {
      var view = new Eduki.Views.Dashboard();
      successServerResponses(this.server);
      var courses = view.$el.find('.listing-owned-course');
      expect(courses.length).toBe(2);
    });

    it('renders course titles', function() {
      var view = new Eduki.Views.Dashboard();
      successServerResponses(this.server);
      var courseTitles = view.$el.find('.listing-square > a');
      expect(courseTitles[0]).toHaveText('Bear Cooking');
      expect(courseTitles[1]).toHaveText('Petting Zoos');
    });

    it('renders first course link', function() {
      var view = new Eduki.Views.Dashboard();
      successServerResponses(this.server);
      var courseLinks = view.$el.find('.listing-square > a');
      expect($(courseLinks[0]).attr('href')).toEqual('/#/courses/1');
    });

    it('renders edit profile button', function() {
      var view = new Eduki.Views.Dashboard();
      successServerResponses(this.server);
      expect(view.$el).toContain('#update-profile');
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
    serverRespond(server, 200, fixtures['user']);
    serverRespond(server, 200, fixtures['enrollments']);
    serverRespond(server, 200, fixtures['user_courses']);
    serverRespond(server, 200, fixtures['courses']);
  }

});

