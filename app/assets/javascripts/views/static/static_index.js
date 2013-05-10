Eduki.Views.StaticIndex= Backbone.View.extend({

  template: JST['static/index'],

  initialize: function() {
    // nothing to initialize
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },
});
