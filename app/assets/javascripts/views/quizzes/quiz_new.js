Eduki.Views.QuizNew = Backbone.View.extend({
	
	template: JST['quizzes/create_quiz'],
	errorTemplate: JST['static/error'],

	events: {
		'click button#add': 'add',
		'submit form': 'submit'
	},

	initialize: function(cid) {
    this.render(this.template());
  },

    // Renders the template
  render: function(template) {
    $(this.el).html(template);
    return this;
  },

  add: function(e) {
  	e.preventDefault();
  	$('#questions').append($('#question').clone().removeClass('hidden'));
  },

  submit: function(e) {
  	e.preventDefault();
  	alert('event fired!' + e.target);
  } 

});