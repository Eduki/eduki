/*
 * Quiz model
 */

Eduki.Models.Quiz = Backbone.Model.extend({

  url: function() {
  	// returns the appropriate url for the application of the quiz
  	if (!this.get('id')) {
  		return '/api/courses/' + this.get('course_id') + '/quizzes';
  	} else {
    	return '/api/quizzes/' + this.get('id');
    }
  }
});
