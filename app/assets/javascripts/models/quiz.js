/*
 * Quiz model
 */

Eduki.Models.Quiz = Backbone.Model.extend({
  url: function() {
    return '/api/quizzes/' + this.get('id');
  }
});
