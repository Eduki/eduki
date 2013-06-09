/*
 * Course collection
 */
Eduki.Collections.Courses = Backbone.Collection.extend({
  initialize: function(options) {
    if (options)
      this.user_id = options.user_id;
  },
  model: Eduki.Models.Course,
  url: function() {
    if (this.user_id)
      return '/api/users/' + this.user_id + '/courses';
    else
      return '/api/courses';
  },

  search: function(query) {
    return this.fetch({data: query});
  }
});
