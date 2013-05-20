Eduki.Models.Course = Backbone.Model.extend({
  urlRoot: '/api/courses/',
	validate : function (attrs, options) {
		if (attrs.title == '') {
			return 'A title cannot be empty';
		}
	}
});
