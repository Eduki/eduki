Eduki.Views.Navbar = Backbone.View.extend({
  template: JST['partials/navbar'],

  render: function() {
    $(this.el).html(this.template());
    return this;
  }
});
