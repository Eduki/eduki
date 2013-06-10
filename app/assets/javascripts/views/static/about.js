/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false,
  JST: false, router: false */
'use strict';

/*
 * About page View. Still very basic
 *
 * Author: Jolie Chen
 */

Eduki.Views.About = Backbone.View.extend({
	className: 'container',

  template: JST['static/about'],

  render: function () {
    $(this.el).html(this.template());
    return this;
  },
});

