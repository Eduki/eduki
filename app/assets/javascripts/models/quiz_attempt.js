/*
 *  * Quiz attempt model
 */

Eduki.Models.QuizAttempt = Backbone.Model.extend({
  url: function() { return '/api/quiz_attempts/' + this.get('id'); },
  createUrl: function() { return '/api/enrollments/' + this.get('enrollment_id') + '/quiz_attempts'; },

  sync: function(method, model, options) {
    if (method == 'create')
      options.url = model.createUrl();
    return Backbone.sync.apply(this, arguments);
  },
});
