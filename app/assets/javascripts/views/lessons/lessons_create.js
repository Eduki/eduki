Eduki.Views.LessonsCreate = Backbone.View.extend({

	template: JST['lessons/lesson-create'],
  errorTemplate: JST['static/error'],

  initialize: function() {
    // nothing to initialize
  },

    // Renders the create lesson form
  render: function(template) {
    $(this.el).html(template);
    return this;
  },
});