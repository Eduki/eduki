/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false,
  JST: false, router: false */
'use strict';

/*
 * Handles rendering a view for a single lesson
 *
 * author: Jolie Chen
 */
Eduki.Views.LessonsLesson = Backbone.View.extend({
  className: 'container',
  template: JST['lessons/lesson'],
  confirmTemplate: JST['lessons/confirm'],
  events: {
    'click .content-delete': 'confirmDelete',
    'click #delete': 'deleteLesson'
  },

  initialize: function () {
    // Initialize models
    var cid = this.attributes.course_id;
    this.course = new Eduki.Models.Course({id: cid});
    this.lesson = new Eduki.Models.Lesson({ course_id: cid,
                                            id: this.attributes.lesson_id });
    this.lessons = new Eduki.Collections.Lessons({course_id: cid});
  },

  // Renders an individual lesson
  render: function () {
    this.fetchData();
    return this;
  },

  fetchData: function () {
    var self = this;
    $.when(this.course.fetch(),
           this.lesson.fetch(),
           this.lessons.fetch()).then(
      function () {
        if (currentUser.authenticated) {
          self.fetchUserData();
        } else {
          $(self.el).html(self.template());
        }
      },
      function () { router.route('/error'); }
    );
  },

  fetchUserData: function () {
    var self = this;
    this.courses = new Eduki.Collections.Courses({user_id: currentUser.id});
    this.enrollments = new Eduki.Collections.Enrollments({user_id: currentUser.id});
    $.when(this.courses.fetch(),
           this.enrollments.fetch()).then(
      function () {
        self.ownership = self.courses.findWhere({id: parseInt(self.course.get('id'), 10)});
        $(self.el).html(self.template());
      },
      function () { router.route('/error'); }
    );
  },

  // Confirm content deletion
  confirmDelete: function () {
    this.$('#delete-confirmation-modal').remove();
    // Show confirmation modal
    this.$el.append(this.confirmTemplate());
    this.$('#delete-confirmation-modal').modal();
  },

  // Deletes the content from database
  deleteLesson: function () {
    var self = this;
    this.lesson.destroy({
      success: function () { router.route('/courses/' + self.course.get('id')); },
      error: function () { router.route('/error'); }
    });
  },
});
