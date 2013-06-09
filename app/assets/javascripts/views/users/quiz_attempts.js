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
    if (currentUser.authenticated) {
      this.fetchEnrollment();
      return this;
    } else {
      router.route('/');
      return false;
    }
  },

  fetchEnrollment: function () {
    var self = this;
    this.enrollment.fetch({
      success: function () { self.renderQuizAttempts() },
      error: function () { router.route('/error'); }
    });
  },

  // Grabs the quiz attempts and adds scores and percents to the attempts
  renderQuizAttempts: function () {
    this.course = new Eduki.Models.Course({id: this.enrollment.get('course_id')});
    this.quizzes = new Eduki.Collections.Quizzes({course_id: this.enrollment.get('course_id')});
    this.quizAttempts = new Eduki.Collections.QuizAttempts({enrollment_id: this.enrollment.get('id')});
    var self = this;
    $.when(this.course.fetch(),
           this.quizzes.fetch(),
           this.quizAttempts.fetch()).then(
      function () { self.renderScores(); },
      function () { router.route('/error'); });
  },

  renderScores: function () {
    var i;
    for (i = 0; i < this.quizAttempts.size(); i += 1) {
      this.quizAttempts.models[i].calculateScore();
    }
    $(this.el).html(this.template());
  },
});
