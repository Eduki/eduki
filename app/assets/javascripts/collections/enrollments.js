/*
 * Collections model for enrollments
 *
 * author: Jolie Chen
 */

Eduki.Collections.Enrollments = Backbone.Collection.extend({
  model: Eduki.Models.Enrollment,
  url: '/api/users/' + currentUser.id + '/enrollments'
});

