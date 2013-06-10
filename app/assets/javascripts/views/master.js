/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false,
  JST: false, router: false */
'use strict';

/* This master view will render for every page.
 *
 * David Mah
 */
Eduki.Views.Master = Backbone.View.extend({
  masterTemplate: JST['meta/application'],

  initialize: function () {
    $(this.el).html("");
  },

  render: function () {
    this.renderNavBar();
    this.renderMasterTemplate();
    return this;
  },

  renderNavBar: function () {
    this.navbar = new Eduki.Views.Navbar();
    $(this.el).append(this.navbar.render().el);
    return this;
  },

  renderMasterTemplate: function () {
    $(this.el).append(this.masterTemplate());
    return this;
  }
});
