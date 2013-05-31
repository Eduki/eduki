/*
 * Quiz collection
 */
Eduki.Collections.Quizzes = Backbone.Collection.extend({
  initialize: function(options) {
    this.course_id = options.course_id;
  },
  model: Eduki.Models.Quiz,
  url: function() { return '/api/courses/' + this.course_id + '/quizzes'; }
});

