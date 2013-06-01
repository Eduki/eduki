/*
 * Renders the view for creating quizzes
 *
 * author: Michael
 */

Eduki.Views.QuizNew = Backbone.View.extend({
	
	template: JST['quizzes/new'],
  problemTemplate: JST['quizzes/problem'],
  deleteErrorTemplate: JST['quizzes/delete_error'],
	errorTemplate: JST['static/error'],
  createdTemplate: JST['quizzes/success'],

	events: {
    'click #create-quiz-add' : 'add',
    'click .create-quiz-delete' : 'deleteProblem',
		'click #submit': 'submit',
    'click .create-quiz-question': 'hideInvalid',
    'click .create-quiz-answer': 'hideInvalid',
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

  deleteProblem: function(e) {
    if ($('.create-quiz-problem').length > 1) {
      $(e.target).closest('.create-quiz-problem').remove();
    } else {
      this.showInvalid('.create-quiz-delete', 'A quiz must have at least one problem');
    }
  },

  submit: function() {
    var problemsArray = new Array();
    var submittedProblems = $('.create-quiz-question');
    for (var i = 0; i < submittedProblems.length; i++) {
      var problem = {
        question: submittedProblems[i].value,
        // the name being the submitted problems id is to handle the case where
        // a user is creating a quiz and deletes problems that are in the middle
        // by associating each question with its own 'problem-i' id, which corresponds
        // a set of radio buttons for that question, it lets everything stay grouped
        answer: $('input[name=' + submittedProblems[i].id + ']:checked', '#quiz').val()
      };

      // needs to have an error template for when they don't select an answer
      if (!problem.answer) {
        return;
      }
      problemsArray[i] = problem;
    }

    this.quiz = new Eduki.Models.Quiz({ course_id: this.attributes.course_id, 
                                        title: $('#create-quiz-title').val(),
                                        problems: problemsArray });
    var self = this;

    $.when(this.quiz.save()).then(
             function() { self.render(self.createdTemplate()); },
             function() { self.render(self.errorTemplate()); }
           );

  },

  // Show an invalid message on error
  showInvalid: function(input, message) {
    this.$(input).attr('data-content', message);
    this.$(input).popover('show');
    this.$('.create-quiz-delete').siblings('.popover').delay(3000).fadeOut();
  },

  // Hide validation error when input is clicked upon
  hideInvalid: function(e) {
    this.$(e.target).parent().siblings().popover('hide');
  },
});

