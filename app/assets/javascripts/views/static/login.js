Eduki.Views.Login = Backbone.View.extend({
  template: JST['static/login'],

  render: function() {
    $(this.el).html(this.template());
    return this;
  }
});
