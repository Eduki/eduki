Eduki.Views.StaticIndex= Backbone.View.extend({

  template: JST['static/index'],

  initialize: function() {
    // Fetch all courses. Once retrieved, execute
    // render through the callback to display them.
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },
});
