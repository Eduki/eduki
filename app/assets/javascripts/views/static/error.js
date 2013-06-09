/*
 * Error page View.
 *
 * Author: Jolie Chen
 */

Eduki.Views.ErrorPage = Backbone.View.extend({

  template: JST['static/error'],

  render: function() {
    $(this.el).html(this.template());
    return this;
  },
});


