Eduki.Views.QuizNew = Backbone.View.extend({
	
	template: JST['quizzes/new'],
  problemTemplate: JST['quizzes/problem'],
  deleteErrorTemplate: JST['quizzes/delete_error'],
	errorTemplate: JST['static/error'],

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
  	this.quiz = new Eduki.Models.Quiz({ course_id: this.attributes.course_id, 
                                        title: $('#create-quiz-title').val() });
    var problems = new Array();
    var submittedProblems = $('.create-quiz-question');
    for (var i = 0; i < submittedProblems.length; i++) {
      console.log(submittedProblems[i].value);
      var problem = {
        question: submittedProblems[i].value,
        // the name being the submitted problems id is to handle the case where
        // a user is creating a quiz and deletes problems that are in the middle
        // by associating each question with its own 'problem-i' id, which corresponds
        // a set of radio buttons for that question, it lets everything stay grouped
        answer: $('input[name=' + submittedProblems[i].id + ']:checked', '#quiz').val()
      };
      console.log(problem.answer);
    }
    alert('quiz model created!' + this.attributes.course_id);
  }
});

