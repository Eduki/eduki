/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false,
  JST: false, router: false, navbar: false */
'use strict';

/*
 * Error page View.
 *
 * Author: Jolie Chen
 */

Eduki.Views.ErrorPage = Backbone.View.extend({

  template: JST['static/error'],

  render: function () {
    $(this.el).html(this.template());
    return this;
  },
});


