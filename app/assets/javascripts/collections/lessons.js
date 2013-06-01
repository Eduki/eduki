/*
 * Lesson collection
 */
Eduki.Collections.Lessons = Backbone.Collection.extend({
  initialize: function(options) {
    if (options)
      this.course_id = options.course_id;
  },
  model: Eduki.Models.Lesson,
  url: function() { return '/api/courses/' + this.course_id + '/lessons'; }
});
