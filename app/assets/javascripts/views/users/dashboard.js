Eduki.Views.Dashboard = Backbone.View.extend({

  template: JST['users/dashboard'],

  initialize: function() {
    // nothing to initialize
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  }
});
