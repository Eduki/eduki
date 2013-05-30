/*
 * View for a user's dashboard. Includes user-related data
 *
 * author: David Mah & Jolie Chen
 */
Eduki.Views.Dashboard = Backbone.View.extend({

  template: JST['users/dashboard'],
  enrolledCoursesTemplate: JST['users/enrolled_courses'],
  errorTemplate: JST['static/error'],

  initialize: function() {
    if (currentUser.authenticated) // Fetch if a user is authenticated
      this.fetchEnrollments();
  },

  // Fetch all enrollments for a user
  fetchEnrollments: function() {
    this.enrollments = new Eduki.Collections.Enrollments({user_id: currentUser.id});
    this.courses = new Eduki.Collections.Courses();
    var self = this;

    // Get enrollments from database
    this.enrollments.fetch({
      success: function() {
        self.renderCourseEnrollments();
      },
      error: function(model, xhr, options) {
        self.render(self.template());
      }
    });
  },

  render: function() {
    if (currentUser.authenticated) {
      $(this.el).html(this.template());
      return this;
    } else {
      router.route("/");
      return false;
    }
  },

  // Renders all the courses a user is in
  renderCourseEnrollments: function() {
    var self = this;
    // Grab all the courses in the database
    this.courses.fetch({
      success: function() {
        var enrollments = self.enrollments.pluck('course_id');
        // Filter only the courses a user is enrolled in
        self.courses = self.courses.filter(function(course) {
          return jQuery.inArray(course.get('id'), enrollments) >= 0;
        });
        self.courses = new Eduki.Collections.Courses(self.courses);
        self.render();
      },
      // If there is an error in fetching courses, display the error page
      error: function() { self.render(self.errorTemplate()); }
    });
  }
});
