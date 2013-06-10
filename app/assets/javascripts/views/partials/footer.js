/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false,
  JST: false, router: false */
'use strict';

/* This view encapsulates logic for the logic partial
 *
 * author: Jolie Chen
 */
Eduki.Views.Footer = Backbone.View.extend({
  template: JST['partials/footer'],

  render: function () {
    $(this.el).html(this.template());
    return this;
  },
});

