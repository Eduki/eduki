Eduki.Models.Lesson = Backbone.Model.extend({
  url: function() {
    return '/api/courses/' + this.get('course_id') + '/lessons/' + this.get('id');
  }
});
