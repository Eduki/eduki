Eduki.Views.Master = Backbone.View.extend({
  masterTemplate: JST['meta/application'],

  initialize: function() {
    $(this.el).html("");
  },

  render: function() {
    this.renderNavBar();
    this.renderMasterTemplate();
    return this;
  },

  renderNavBar: function() {
    this.navbar = new Eduki.Views.Navbar();
    $(this.el).append(this.navbar.render().el);
    return this;
  },

  renderMasterTemplate: function() {
    $(this.el).append(this.masterTemplate());
    return this;
  }
});
