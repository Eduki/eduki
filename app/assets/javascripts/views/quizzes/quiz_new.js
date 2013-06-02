/*
 * Renders the view for creating quizzes
 *
 * author: Michael
 */

Eduki.Views.QuizNew = Backbone.View.extend({
	
	template: JST['quizzes/new'],
  problemTemplate: JST['quizzes/problem'],
	errorTemplate: JST['static/error'],

	events: {
    'click #create-quiz-add' : 'add',
    'click .create-quiz-delete' : 'deleteProblem',
		'click #publish': 'validateQuiz',
		'submit form': 'validateQuiz',
    'click #create-quiz-title': 'hideInvalid',
    'click .create-quiz-question': 'hideInvalid',
	},

	initialize: function() {
    this.count = 0;
    this.render(this.template());
    this.$('#create-quiz-problems').append(this.problemTemplate());
  },

    // Renders the template
  render: function(template) {
    $(this.el).html(template);
    return this;
  },

  // adds a problem to the form
  add: function() {
    this.count++;
    this.$('#create-quiz-problems').append(this.problemTemplate());
  },

  // Deletes a problem from the form.
  deleteProblem: function(e) {
    if (this.$('.create-quiz-problem').length > 1) {
      this.$(e.target).parent().remove();
    } else {
      // A quiz must always have at least one problem
      this.showInvalid('.create-quiz-delete', 'A quiz must have at least one problem');
      this.$('.create-quiz-delete').siblings('.popover').delay(2000).fadeOut();
    }
  },

  // Validate all fields are passed before submitting
  validateQuiz: function(e) {
    this.$('.popover').remove(); e.preventDefault();

    // Do not allow empty quiz title
    if (!this.$('#create-quiz-title').val()) {
      this.showInvalid(this.$('form .control-label').first(), 'Please provide a title');
    }

    var submittedProblems = this.$('.create-quiz-problem');
    var problems = new Array(); // Array for database submission
    for (var i = 0; i < submittedProblems.length; i++) {
      var questionLabel = $(submittedProblems[i]).find('.control-label').first();
      var question = $(submittedProblems[i]).find('textarea');
      var answer = this.$('input[name=' + $(question).attr('id') + ']:checked', '#quiz');

      // Questions must have a problem and correct answer
      if (!(question.val() && answer.val())) {
        this.showInvalid(questionLabel, 'Please provide a question and correct answer');
      } else {
        var problem = {
          question: question.val(),

          // the name being the submitted problems id is to handle the case where
          // a user is creating a quiz and deletes problems that are in the middle
          // by associating each question with its own 'problem-i' id, which corresponds
          // a set of radio buttons for that question, it lets everything stay grouped
          answer: answer.val()
        }
        problems.push(problem);
        }
      }

    // Submit the quiz if all the data is valid
    if (this.$('#create-quiz-title').val() &&
        (submittedProblems.length == problems.length)) {
      this.submit(problems);
    } else {
      this.showInvalid(this.$('#publish'), "There are errors with your quiz");
      this.$('#publish').siblings('.popover').delay(2000).fadeOut();
    }
  },

  // Submit quiz to database
  submit: function(problems) {
    this.quiz = new Eduki.Models.Quiz({ course_id: this.attributes.course_id,
                                        title: $('#create-quiz-title').val(),
                                        problems: problems});
    // Save quiz to database
    var self = this;
    $.when(this.quiz.save()).then(
             function() { router.route('/courses/' + self.quiz.get('course_id') +
                                       '/quizzes/' + self.quiz.get('id'));},
             function() { self.render(self.errorTemplate()); }
           );
  },

  // Show an invalid message on error
  showInvalid: function(input, message) {
    this.$(input).attr('data-content', message);
    this.$(input).popover('show');
  },

  // Hide validation error when input is clicked upon
  hideInvalid: function(e) {
    this.$(e.target).parent().siblings().popover('hide');
  },
});

