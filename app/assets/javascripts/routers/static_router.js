/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*global Eduki: false, Backbone: false, $: false */
'use strict';

Eduki.Routers.Static = Backbone.Router.extend({
  routes: {
    '': 'index',
    'about(/)': 'about',
  },

  index: function () {
    // Delegate to the StaticIndex View and render it inside of the container
    var view = new Eduki.Views.StaticIndex();
    $('#main-content').html(view.render().el);
  },

  about: function () {
    var view = new Eduki.Views.About();
    $('#main-content').html(view.render().el);
  }
});
