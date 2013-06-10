/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false,
  JST: false, router: false */
'use strict';

/*
 * View for a user's dashboard. Includes user-related data
 *
 * author: David Mah & Jolie Chen
 */
Eduki.Views.Dashboard = Backbone.View.extend({
  className: 'container',
  id: 'dashboard',

  template: JST['users/dashboard'],
  enrolledCoursesTemplate: JST['users/enrolled_courses'],
  ownedCoursesTemplate: JST['users/owned_courses'],

  events: {
    'mouseleave .listing-enrolled-course': 'hideOverlay',
  },

  initialize: function () {
    if (currentUser.authenticated) {
      this.user = new Eduki.Models.User({id: currentUser.id});
      this.courses = new Eduki.Collections.Courses();
      this.enrollments = new Eduki.Collections.Enrollments({user_id: currentUser.id});
      this.ownedCourses = new Eduki.Collections.Courses({user_id: currentUser.id});
    }
  },

  render: function () {
    var self = this;
    // Get enrollments from database
    if (!currentUser.authenticated) {
      router.route('/');
      self = false;
    } else {
      self.fetchUserInfo();
    }
    return self;
  },

  fetchUserInfo: function () {
    var self = this;
    $.when(self.user.fetch(),
           self.enrollments.fetch(),
           self.ownedCourses.fetch()).then(
      function () {
        self.renderUserInfo();
        $(self.el).html(self.template());
      },
      function () { router.route('/error'); }
    );
  },

  // Renders all the courses a user is in
  renderUserInfo: function () {
    // The user's dashboard header to their name if it exists
    this.firstName = this.user.get('first_name');
    if (!this.firstName) {
      this.firstName = 'Your';
    } else {
      this.firstName += '\'s';
    }

    var self = this;
    // Grab all the courses in the database
    this.courses.fetch({
      success: function () {
        var enrollments = self.enrollments.pluck('course_id');
        // Filter only the courses a user is enrolled in
        var courses = self.courses.filter(function (course) {
          return jQuery.inArray(course.get('id'), enrollments) >= 0;
        });
        self.courses = new Eduki.Collections.Courses(courses);
        $(self.el).append(self.enrolledCoursesTemplate());
        self.calculateOverlays();
        $(self.el).append(self.ownedCoursesTemplate());
      },
      // If there is an error in fetching courses, display the error page
      error: function () { router.route('/error'); }
    });
  },

  // Show enrolled course overlay
  showOverlay: function () {
    $(this).siblings().slideDown(300);
  },

  // Hide enrolled course overlay
  hideOverlay: function (e) {
    this.$('.enrolled-course-overlay').slideUp(300);
  },

  // Calculate the positions of the overlays
  calculateOverlays: function () {
    var listings = this.$('.listing-enrolled-course > div.span2');
    var overlays = this.$('.enrolled-course-overlay');
    var i;
    for (i = 0; i < listings.length; i += 1) {
      $(listings[i]).hover(this.showOverlay);
      var offset = parseInt($(listings[i]).attr('id').slice(-1), 10);
      $(overlays[i]).css('margin-left', 20 + (offset * 160) + 'px');
    }
  },
});
