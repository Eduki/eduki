/*
 * Quiz attempt collection
 */
Eduki.Collections.QuizAttempts = Backbone.Collection.extend({
  initialize: function(options) {
    if (options)
      this.enrollment_id = options.enrollment_id;
  },
  model: Eduki.Models.QuizAttempt,
  url: function() {
    if (this.enrollment_id)
      return '/api/enrollments/' + this.enrollment_id + '/quiz_attempts';
    else
      return 'api/quiz_attempts/' + this.get('id');
  }
});
