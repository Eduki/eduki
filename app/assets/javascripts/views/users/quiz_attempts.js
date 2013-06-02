/*
 * Quiz attempts view.
 *
 * Author: Jolie Chen
 */

Eduki.Views.QuizAttempts = Backbone.View.extend({

  template: JST['users/quiz_attempts'],
  errorTemplate: JST['static/error'],

  initialize: function() {
    var self = this;
    this.enrollment = new Eduki.Models.Enrollment({id: this.attributes.enrollment_id});
    this.enrollment.fetch({
      success: function() {self.renderQuizAttempts()},
      error: function() {
        self.render(self.errorTemplate())}
    });
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

  // Grabs the quiz attempts and adds scores and percents to the attempts
  renderQuizAttempts: function() {
    this.course = new Eduki.Models.Course({id: this.enrollment.get('course_id')});
    this.quizzes = new Eduki.Collections.Quizzes({course_id: this.enrollment.get('course_id')});
    this.quizAttempts = new Eduki.Collections.QuizAttempts({enrollment_id: this.enrollment.get('id')});
    var self = this;
    $.when(this.course.fetch(),
           this.quizzes.fetch(),
           this.quizAttempts.fetch()).then(
           function() {
             for (var i = 0; i < self.quizAttempts.size(); i++) {
               var attempt = self.quizAttempts.models[i].get('problem_attempts');
               var score = self.calculatescore(attempt);
               self.quizAttempts.models[i].set('score', score);
               self.quizAttempts.models[i].set('percent', score/attempt.length);
             }
             self.render(self.template());
           },
           function() {
             self.render(self.errorTemplate());}
           );
  },

  // Calculates the number correct for a given attempt
  calculatescore: function(attempt) {
    console.log(attempt);
    var correct = 0;
    for (var i = 0; i < attempt.length; i++) {
      if (attempt[i]['correct'])
        correct++
    }
    return correct;
  }
});
