/*
 * Enrollment model
 *
 * author: Jolie Chen
*/

Eduki.Models.Enrollment = Backbone.Model.extend({
  url: function() {
    // returns the appropriate url for the application of the quiz
    if (this.get('user_id')) {
      return '/api/users/' + this.get('user_id') + '/enrollments';
    } else {
      return '/api/enrollments/' + this.get('id');
    }
  },

  deleteUrl: function() { return '/api/enrollments/' + this.get('id'); },

  sync: function(method, model, options) {
    if (method == 'delete')
      options.url = model.deleteUrl();
    Backbone.sync(method, model, options);
  },
});
