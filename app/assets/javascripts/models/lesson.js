/*
 * Lesson model
 */

Eduki.Models.Lesson = Backbone.Model.extend({
  urlRoot: function() {
    return '/api/courses/' + this.get('course_id') + '/lessons/';
  },

  deleteUrl: function() { return '/api/lessons/' + this.get('id'); },

  sync: function(method, model, options) {
    if (method == 'delete')
      options.url = model.deleteUrl();
    return Backbone.sync.apply(this, arguments);
  },

	validate : function (attrs, options) {
		if (!attrs.title) {
			return new Array('form-lesson-title', 'Please provide a title');
		} else if (!attrs.body) {
			return new Array('form-lesson-body', 'Please provide lesson content');
    }
	}
});
