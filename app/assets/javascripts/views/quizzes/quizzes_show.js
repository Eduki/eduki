/*
 * Handles rendering a view for taking a quiz
 *
 * author: Jolie Chen
 */

 Eduki.Views.QuizShow = Backbone.View.extend({
   className: 'container',
   template: JST['quizzes/quiz'],
   resultsTemplate: JST['quizzes/results'],
   events: {
     'click #submit-quiz': 'grade',
     'submit form': 'grade',
   },

  initialize: function() {
    // Initialize models
    this.course = new Eduki.Models.Course({id: this.attributes.course_id});
    this.quiz = new Eduki.Models.Quiz({id: this.attributes.quiz_id});
    this.quizzes = new Eduki.Collections.Quizzes({course_id: this.course.get('id')});
    this.enrollments = new Eduki.Collections.Enrollments({user_id: currentUser.id});

  },

  // Renders an quiz unless user isn't logged in
  render: function() {
    if (currentUser.authenticated) {
      this.fetchData();
      return this;
    } else {
      router.route('/');
      return false;
    }
  },

  // Fetch all the necessary data
  fetchData: function () {
    var self = this;
    $.when(this.course.fetch(),
           this.quizzes.fetch(),
           this.quiz.fetch(),
           this.enrollments.fetch()).then(
      function() { $(self.el).html(self.template()); },
      function() { router.route('/error'); }
      );
  },

  // See if a user is enrolled
  isEnrolled: function() {
    this.enrollment = this.enrollments.findWhere({course_id: parseInt(this.course.get('id'))});
    return this.enrollment;
  },

  // Saves quiz attempt
  saveAttempt: function(problems) {
    this.quizAttempt = new Eduki.Models.QuizAttempt({quiz_id: this.quiz.get('id'),
                                                     enrollment_id: this.enrollment.get('id'),
                                                     problem_attempts: problems});

    var self = this;
    this.quizAttempt.save({}, {
      success: function() {
        self.$el.append(self.resultsTemplate());
        self.$('#quiz-results-modal').modal();
      },
      error: function() { router.route('/error'); }});
  },

  // Calculate the total questions correct
  // Create the problem attempts array to send to database
  grade: function() {
    // Remove old modal
    self.$('#quiz-results-modal').remove();

    // Enrolled users can submit quiz attempts
    if (this.isEnrolled()) {
      var problemAttempts = new Array();
      this.correct = 0;
      for (var i = 0; i < this.quiz.get('problems').length; i++) {
        //Grab user's input answer
        var inputAnswer = this.$('input:radio[name=problem-' +
                          this.quiz.get('problems')[i].id + ']:checked').val();
        var answer = this.quiz.get('problems')[i].answer;
        if (inputAnswer == answer)
          this.correct++;

        // Empty string or user's answer is pushed onto problemAttempts
        problemAttempts.push({answer: (inputAnswer ? inputAnswer : '')});
      }
      this.saveAttempt(problemAttempts);
    } else {
      // Show an error message if user is unable to submit
      this.$('#submit-quiz').attr('data-content', 'Please enroll in course to take this quiz');
      this.$('#submit-quiz').popover('show');
    }
  },
});
