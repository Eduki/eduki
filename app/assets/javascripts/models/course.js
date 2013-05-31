Eduki.Models.Course = Backbone.Model.extend({
  urlRoot: '/api/courses/',
	validate : function (attrs, options) {
		if (!attrs.title) {
			return new Array('create-course-title', 'Please provide a title');
		} else if (!attrs.description || attrs.description.length > 500) {
			return new Array('create-course-description', 'Please provide a valid description');
    }
	}
});
