/*
 * Handles rendering a view for taking a quiz
 *
 * author: Jolie Chen
 */

 Eduki.Views.QuizShow = Backbone.View.extend({
   template: JST['quizzes/quiz'],
   resultsTemplate: JST['quizzes/results'],
   errorTemplate: JST['static/error'],
   events: {
     'submit form': 'submit',
   },

  initialize: function() {
    // Initialize models
    this.course = new Eduki.Models.Course({id: this.attributes.course_id});
    this.quiz = new Eduki.Models.Quiz({id: this.attributes.quiz_id});
    this.quizzes = new Eduki.Collections.Quizzes();
    this.quizzes.url = '/api/courses/' + this.course.get('id') + '/quizzes';

    // Fetch course and lessons. Once retrieved, execute
    // render through the callback to display them.
    var self = this;
    $.when(this.course.fetch(),
           this.quizzes.fetch(),
           this.quiz.fetch()).then(
             function() { self.render(self.template()); },
             function() { self.render(self.errorTemplate()); }
           );
  },

  // Renders an individual lesson
  render: function(template) {
    $(this.el).html(template);
    return this;
  },

  submit: function(e) {
    e.preventDefault();
    this.$el.append(this.resultsTemplate());
    $('#quiz-results-modal').modal();
  }
 });
