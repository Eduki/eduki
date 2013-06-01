/*
 * Lesson model
 */

Eduki.Models.Lesson = Backbone.Model.extend({
  urlRoot: function() {
    return '/api/courses/' + this.get('course_id') + '/lessons/';
  }
});
