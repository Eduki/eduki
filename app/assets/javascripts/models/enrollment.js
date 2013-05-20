/*
 * Enrollment model
 */

Eduki.Models.Enrollment = Backbone.Model.extend({
  url: function() {
    return '/api/enrollments/' + this.get('id');
  }
});

