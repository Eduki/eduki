/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false,
  JST: false, router: false */
'use strict';

/*
 * Premium users view.
 *
 * Author: Jolie Chen
 */

Eduki.Views.Premium = Backbone.View.extend({

  template: JST['users/premium'],

  render: function () {
    $(this.el).html(this.template());
    return this;
  },
});

