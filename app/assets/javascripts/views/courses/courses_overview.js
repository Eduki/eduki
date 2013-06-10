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
  unenrollTemplate: JST['courses/unenroll'],
  noLessonsTemplate: JST['courses/no_lessons'],
  noQuizzesTemplate: JST['courses/no_quizzes'],
  events: {
    'click #enroll': 'enroll',
    'click #enrolled': 'confirmUnenroll',
    'click .content-delete': 'confirmDelete',
    'click #delete': 'deleteContent',
    'click #unenroll': 'unenroll',
    'mouseenter #enroll': 'showEnrollPopover',
    'mouseleave #enroll': 'hideEnrollPopover',
  },

  initialize: function () {
    var self = this;
    this.course = new Eduki.Models.Course({id: this.attributes.course_id});
    this.quizzes = new Eduki.Collections.Quizzes({course_id: this.course.get('id')});
    this.lessons = new Eduki.Collections.Lessons({course_id: this.course.get('id')});
    $.when(this.course.fetch(),
           this.quizzes.fetch(),
           this.lessons.fetch()).then(
      function () {
        self.render(self.template());
        if (currentUser.authenticated) {
          self.getUserInfo();
        }
      },
      function () { self.render(self.errorTemplate()); }
    );
  },

  // Renders a course's lesson
  render: function (template) {
    $(this.el).html(template);
    return this;
  },

  getUserInfo: function () {
    var self = this;
    this.courses = new Eduki.Collections.Courses({user_id: currentUser.id});
    this.enrollments = new Eduki.Collections.Enrollments({user_id: currentUser.id});
    $.when(this.courses.fetch(),
           this.enrollments.fetch()).then(
      function () {
        self.render(self.template());
        self.setOwnership();
        self.setEnrolled();
      },
      function () { self.render(self.errorTemplate()); }
    );
  },

  setOwnership: function () {
    this.ownership = this.courses.findWhere({id: parseInt(this.course.get('id'), 10)});
    if (this.ownership) {
      this.render(this.template());
    }
  },

  // Indicates user is enrolled
  setEnrolled: function () {
    // See if a user is enrolled in this particular course
    this.enrollment = this.enrollments.findWhere({course_id: parseInt(this.course.get('id'), 10)});
    if (this.enrollment) {
      this.$('#enroll').attr('id', 'enrolled');
    }
  },

  showEnrollPopover: function () {
    this.$('#enroll').attr('data-content', "Enroll!");
    this.$('#enroll').popover('show');
  },

  hideEnrollPopover: function () {
    this.$('.popover').remove();
  },

  // Enrolls a user in this course
  enroll: function () {
    if (!this.enrollment && currentUser.authenticated) {
      this.$('.popover').remove();
      this.enrollment = new Eduki.Models.Enrollment({user_id: currentUser.id,
                                                    course_id: this.course.get('id')});
      this.enrollment.save({}, {wait: true});
      this.$('#enroll').attr('id', 'enrolled');
    }
  },

  confirmUnenroll: function () {
    this.$el.append(this.unenrollTemplate());
    this.$('#unenroll-confirmation-modal').modal();
  },

  // Unenrolls a user
  unenroll: function () {
    this.$('#unenroll-confirmation-modal').remove();
    var self = this;
    this.enrollment.destroy({
      success: function () {
        self.$('#enrolled').attr('id', 'enroll');
        self.enrollment = undefined;
      },
      error: function () { self.render(self.errorTemplate()); }
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
        error: function () { self.render(self.errorTemplate()); }
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
          self.noContentMessage();
        },
        error: function () { self.render(self.errorTemplate()); }
      });
    }
  },

  // Show a message if there are no lessons or quizzes
  noContentMessage: function () {
    if (this.$('.listing-lesson').length === 0 &&
        this.$('#course-lessons').find('p').length === 0) {
      this.$('#course-lessons h2').after(this.noLessonsTemplate());
    } else if (this.$('.listing-quiz').length === 0 &&
               this.$('#course-quizzes').find('p').length === 0) {
      this.$('#course-quizzes h2').after(this.noQuizzesTemplate());
    }
  },
});
