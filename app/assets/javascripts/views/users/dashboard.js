/*
 * View for a user's dashboard. Includes user-related data
 *
 * author: David Mah & Jolie Chen
 */
Eduki.Views.Dashboard = Backbone.View.extend({

  template: JST['users/dashboard'],
  enrolledCoursesTemplate: JST['users/enrolled_courses'],
  ownedCoursesTemplate: JST['users/owned_courses'],
  errorTemplate: JST['static/error'],

  initialize: function() {
    if (currentUser.authenticated) {
      this.user = new Eduki.Models.User({id: currentUser.id});
      this.courses = new Eduki.Collections.Courses();
      this.enrollments = new Eduki.Collections.Enrollments({user_id: currentUser.id});
      this.ownedCourses = new Eduki.Collections.Courses({user_id: currentUser.id});

      var self = this;
      // Get enrollments from database
      $.when(this.user.fetch(),
             this.enrollments.fetch(),
             this.ownedCourses.fetch()).then(
               function() {
                 self.renderUserInfo();
               },
               function() {
                 self.render(self.errorTemplate());
               }
      );
    }
  },

  render: function(template) {
    if (currentUser.authenticated) {
      $(this.el).html(template);
      return this;
    } else {
      router.route('/');
      return false;
    }
  },

  // Renders all the courses a user is in
  renderUserInfo: function() {
    this.render(this.template());
    var self = this;
    // Grab all the courses in the database
    this.courses.fetch({
      success: function() {
        var enrollments = self.enrollments.pluck('course_id');
        // Filter only the courses a user is enrolled in
        var courses = self.courses.filter(function(course) {
          return jQuery.inArray(course.get('id'), enrollments) >= 0;
        });
        self.courses = new Eduki.Collections.Courses(courses);
        self.$('#dashboard').append(self.enrolledCoursesTemplate());
        self.$('#dashboard').append(self.ownedCoursesTemplate());
      },
      // If there is an error in fetching courses, display the error page
      error: function() { self.render(self.errorTemplate()); }
    });
  },

  renderQuizAttempts: function() {
    this.quizAttempts = new Eduki.Collections.QuizAttempts({enrollment_id: currentUser.id});
  },

  renderOwnedCourses: function() {
    
  },
});
