Eduki.Collections.Courses = Backbone.Collection.extend({
  model: Eduki.Models.Course,
  url: '/api/courses',

  // TODO: When search API is implemented, use whatever endpoint that gets
  searchUrl: '/api/courses',

  search: function(query) {
    return this.fetch({data: query});
  }
});
