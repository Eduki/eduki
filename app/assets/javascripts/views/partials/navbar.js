/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false,
  JST: false, router: false */
'use strict';

/* This view encapsulates logic for the navbar partial
 *
 * David Mah
 */
Eduki.Views.Navbar = Backbone.View.extend({
  template: JST['partials/navbar'],
  events: {
    'click #navbar-logout': 'logout'
  },

  render: function () {
    $(this.el).html(this.template());
    return this;
  },

  logout: function () {
    currentUser.flush_credentials();
    router.redirect("/");
  }
});
