Eduki.Views.StaticIndex = Backbone.View.extend({

  template: JST['static/index'],
  splashTemplate: JST['static/splash'],

  initialize: function() {
    // nothing to initialize
  },

  render: function() {
    $(this.el).html(this.template());
    $('#main-content').before(this.splashTemplate());
    return this;
  },
});
