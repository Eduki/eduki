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

	initialize: function(cid) {
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
  	alert('event fired!' + e.target);
  }
});

