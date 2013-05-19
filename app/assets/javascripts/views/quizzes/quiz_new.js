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
        answer: $('input[name=problem-' + i + ']:checked', '#quiz').val()
      };
      console.log(problem.answer);
    }
    alert('quiz model created!' + this.attributes.course_id);
  }
});

