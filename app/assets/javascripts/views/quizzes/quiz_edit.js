/*
 * Handles rendering a view for editing a quiz
 *
 * author: Micheal Abboud
 */

 Eduki.Views.QuizEdit = Backbone.View.extend({
   template: JST['quizzes/edit'],
   errorTemplate: JST['static/error'],

   events: {

   },

  initialize: function() {
    // Initialize models
    this.course = new Eduki.Models.Course({id: this.attributes.course_id});
    this.quiz = new Eduki.Models.Quiz({id: this.attributes.quiz_id});
    this.quizzes = new Eduki.Collections.Quizzes({course_id: this.course.get('id')});
    this.enrollments = new Eduki.Collections.Enrollments({user_id: currentUser.id});

    // Fetch course and lessons. Once retrieved, execute
    // render through the callback to display them.
    var self = this;
    $.when(this.course.fetch(),
           this.quizzes.fetch(),
           this.quiz.fetch(),
           this.enrollments.fetch()).then(
             function() {self.render(self.template());},
             function() {self.render(self.errorTemplate());}
           );
  },

  // Renders an quiz unless user isn't logged in
  render: function(template) {
    if (currentUser.authenticated) {
      $(this.el).html(template);
      return this;
    } else {
      router.route('/');
      return false;
    }
  },

  // See if a user is enrolled
  isEnrolled: function() {
    this.enrollment = this.enrollments.findWhere({course_id: parseInt(this.course.get('id'))});
    return this.enrollment;
  },
});
