Eduki.Views.StaticIndex = Backbone.View.extend({

  template: JST['static/index'],
  splashTemplate: JST['static/splash'],
  loginTemplate: JST['static/splash_login'],
  signupTemplate: JST['static/splash_signup'],

  initialize: function() {
    // nothing to initialize
  },

  render: function() {
    $(this.el).html(this.template());
    $(this.el).append(this.splashTemplate());
    return this;
  },
});
