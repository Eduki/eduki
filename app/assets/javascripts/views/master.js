Eduki.Views.Master = Backbone.View.extend({
  masterTemplate: JST['meta/application'],
  navbar: JST['partials/navbar'],

  initialize: function() {
    $(this.el).html("");
    this.renderNavBar();
    this.renderMasterTemplate();
  },

  renderNavBar: function() {
    $(this.el).append(this.navbar());
    return this;
  },

  renderMasterTemplate: function() {
    $(this.el).append(this.masterTemplate());
    return this;
  }
});
