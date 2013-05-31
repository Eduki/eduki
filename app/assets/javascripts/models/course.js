Eduki.Models.Course = Backbone.Model.extend({
  urlRoot: '/api/courses/',
  createUrl: function() { return '/api/users/' + this.get('user_id') + '/courses/'; },

  sync: function(method, model, options) {
    if (method == 'create')
      options.url = model.createUrl();
    Backbone.sync(method, model, options);
  },

	validate : function (attrs, options) {
		if (!attrs.title) {
			return new Array('create-course-title', 'Please provide a title');
		} else if (!attrs.description || attrs.description.length > 500) {
			return new Array('create-course-description', 'Please provide a valid description');
    }
	}
});
