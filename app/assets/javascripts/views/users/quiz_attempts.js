/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false,
  JST: false, router: false */
'use strict';

/*
 * Quiz attempts view.
 *
 * Author: Jolie Chen
 */

Eduki.Views.QuizAttempts = Backbone.View.extend({
  className: 'container',
  id: 'quiz-attempts',
  template: JST['users/quiz_attempts'],

  initialize: function () {
    this.enrollment = new Eduki.Models.Enrollment({id: this.attributes.enrollment_id});
  },

  render: function () {
    var self;
    if (currentUser.authenticated) {
      this.fetchEnrollment();
      self = this;
    } else {
      router.route('/');
      self = false;
    }
    return self;
  },

  fetchEnrollment: function () {
    var self = this;
    this.enrollment.fetch({
      success: function () { self.renderQuizAttempts(); },
      error: function () { router.route('/error'); }
    });
  },

  // Grabs the quiz attempts and adds scores and percents to the attempts
  renderQuizAttempts: function () {
    var cid = this.enrollment.get('course_id');
    this.course = new Eduki.Models.Course({id: cid});
    this.quizzes = new Eduki.Collections.Quizzes({course_id: cid});
    this.quizAttempts = new Eduki.Collections.QuizAttempts({enrollment_id: this.enrollment.get('id')});
    var self = this;
    $.when(this.course.fetch(),
           this.quizzes.fetch(),
           this.quizAttempts.fetch()).then(
      function () { self.renderScores(); },
      function () { router.route('/error'); }
    );
  },

  renderScores: function () {
    var i;
    for (i = 0; i < this.quizAttempts.size(); i += 1) {
      this.quizAttempts.models[i].calculateScore();
    }
    $(this.el).html(this.template());
  },
});
