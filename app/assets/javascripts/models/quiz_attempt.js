/*
 * Quiz attempt model
 */

Eduki.Models.QuizAttempt = Backbone.Model.extend({
  url: function () { return '/api/quiz_attempts/' + this.get('id'); },
  createUrl: function () { return '/api/enrollments/' + this.get('enrollment_id') + '/quiz_attempts'; },

  sync: function (method, model, options) {
    if (method == 'create')
      options.url = model.createUrl();
    return Backbone.sync.apply(this, arguments);
  },

  // Calculates the score of a quiz attempt and its respective percentage score
  calculateScore: function () {
    var attempts = this.get('problem_attempts');
    var correct = 0;
    var i;
    for (i = 0; i < attempts.length; i += 1) {
      if (attempts[i].correct) {
        correct += 1;
      }
    }

    this.set('score', correct);
    this.set('percent', (correct / attempts.length) * 100);
  },
});
