/*
 * Lesson model
 */

Eduki.Models.Lesson = Backbone.Model.extend({
  urlRoot: function() {
    return '/api/courses/' + this.get('course_id') + '/lessons/';
  },

	validate : function (attrs, options) {
		if (!attrs.title) {
			return new Array('form-lesson-title', 'Please provide a title');
		} else if (!attrs.body) {
			return new Array('form-lesson-body', 'Please provide lesson content');
    }
	}
});
