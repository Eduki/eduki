Eduki.Views.LessonsCreate = Backbone.View.extend({

	template: JST['lessons/new'],
  errorTemplate: JST['static/error'],

  initialize: function() {
    // nothing to initialize
    var self = this;
    self.render(self.template());
   // self.render(self.errorTemplate());
  },

    // Renders the create lesson form
  render: function(template) {
    $(this.el).html(template);
    return this;
  },
});