/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false,
  JST: false, router: false */
'use strict';

/*
 * An overall view of a course and its lessons/quizzes
 *
 * author: Jolie Chen
*/
Eduki.Views.CoursesOverview = Backbone.View.extend({

  template: JST['courses/overview'],
  errorTemplate: JST['static/error'],
  confirmTemplate: JST['courses/confirm'],
  events: {
    'click #enroll': 'enroll',
    'click #enrolled': 'unenroll',
    'click .content-delete': 'confirmDelete',
    'click #confirm': 'deleteContent'
  },

  initialize: function () {
    var self = this;
    this.course = new Eduki.Models.Course({id: this.attributes.course_id});
    this.quizzes = new Eduki.Collections.Quizzes({course_id: this.course.get('id')});
    this.lessons = new Eduki.Collections.Lessons({course_id: this.course.get('id')});
  },

  // Renders a course's lesson
  render: function () {
    var self = this;
    $.when(this.course.fetch(),
           this.quizzes.fetch(),
           this.lessons.fetch()).then(
      function () {
        $(self.el).html(self.template());
        if (currentUser.authenticated) {
          self.getUserInfo();
        }
      },
      function () { router.route('/error'); }
    );
    return self;
  },

  getUserInfo: function () {
    var self = this;
    this.courses = new Eduki.Collections.Courses({user_id: currentUser.id});
    this.enrollments = new Eduki.Collections.Enrollments({user_id: currentUser.id});
    $.when(this.courses.fetch(),
           this.enrollments.fetch()).then(
      function () {
        self.setOwnership();
        self.setEnrolled();
      },
      function () { router.route('/error'); }
    );
  },

  setEnrolled: function () {
    this.enrollment = this.enrollments.findWhere({course_id: parseInt(this.course.get('id'), 10)});
    if (this.enrollment) {
      this.$('#enroll').attr('id', 'enrolled');
    }
  },

  // Indicates user is enrolled
  setOwnership: function () {
    // See if a user is enrolled in this particular course
    this.ownership = this.courses.findWhere({id: parseInt(this.course.get('id'), 10)});
    if (this.ownership) {
      $(this.el).html(this.template());
    }
  },

  // Enrolls a user in this course
  enroll: function () {
    if (!this.enrollment && currentUser.authenticated) {
      this.enrollment = new Eduki.Models.Enrollment({user_id: currentUser.id,
                                                    course_id: this.course.get('id')});
      this.enrollment.save({}, {wait: true});
      this.$('#enroll').attr('id', 'enrolled');
    }
  },

  // Unenrolls a user
  unenroll: function () {
    var self = this;
    this.enrollment.destroy({
      success: function () {
        self.$('#enrolled').attr('id', 'enroll');
        self.enrollment = undefined;
      },
      error: function () { router.route('/error'); }
    });
  },

  // Confirm content deletion
  confirmDelete: function (e) {
    this.deleteTarget = $(e.target);
    this.$('#delete-confirmation-modal').remove();

    // Grab the title of the content a user wants to delete
    if ($(e.target).attr('id') === 'course-ownership-delete') {
      this.deleteTitle = this.course.get('title');
    } else {
      this.deleteTitle = $(e.target).parent().siblings('a').find('span').html();
    }

    // Show confirmation modal
    this.$el.append(this.confirmTemplate());
    this.$('#delete-confirmation-modal').modal();
  },

  // Deletes the content from database
  deleteContent: function () {
    var self = this;
    // Grabs the appropriate model to delete
    if (this.course.get('title') === this.deleteTitle) {
      this.course.destroy({
        success: function () { router.route('/courses'); },
        error: function () { router.route('/error'); }
      });
    } else {
      // See if it is a quiz or lesson
      var content = this.lessons.findWhere({title: this.deleteTitle});
      if (!content) {
        content = this.quizzes.findWhere({title: this.deleteTitle});
      }

      content.destroy({
        success: function () {
          // Remove from view
          $(self.deleteTarget).closest('.listing-line').remove();
        },
        error: function () { router.route('/error'); }
      });
    }
  },
});
