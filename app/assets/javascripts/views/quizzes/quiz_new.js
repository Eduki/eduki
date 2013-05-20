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
  createdTemplate: JST['quizzes/created'],

	events: {
    'click #create-quiz-add' : 'add',
    'click .create-quiz-delete' : 'deleteProblem',
		'submit form': 'submit'
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
    if ($('.create-quiz-problem').length != 1) {
      $(e.target).closest('.create-quiz-problem').remove();
    } else if ($('.alert').length <= 0) {
        $('.create-quiz-delete').after(this.deleteErrorTemplate());
        $('#create-quiz-delete-error').delay(2000).fadeOut(function() {
          $('#create-quiz-delete-error').remove();
        });
    }
  },

  submit: function(e) {
  	e.preventDefault();
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

  }
});

