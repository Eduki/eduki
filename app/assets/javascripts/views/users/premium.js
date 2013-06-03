/*
 * Premium users view.
 *
 * Author: Jolie Chen
 */

Eduki.Views.Premium = Backbone.View.extend({

  template: JST['users/premium'],

  render: function() {
    $(this.el).html(this.template());
    return this;
  },
});

