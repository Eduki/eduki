/*
 * Collections model for enrollments
 *
 * author: Jolie Chen
 */

Eduki.Collections.Enrollments = Backbone.Collection.extend({
  initialize: function(options) {
    this.user_id = options.user_id;
  },
  model: Eduki.Models.Enrollment,
  url: function() { return '/api/users/' + this.user_id + '/enrollments'; }
});
