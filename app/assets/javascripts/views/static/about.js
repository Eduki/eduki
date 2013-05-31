/*
 * About page View. Still very basic
 *
 * Author: Jolie Chen
 */

Eduki.Views.About = Backbone.View.extend({

  template: JST['static/about'],

  render: function() {
    $(this.el).html(this.template());
    return this;
  },
});

