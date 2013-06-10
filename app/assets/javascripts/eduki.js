/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*jslint sloppy: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: true ,
  JST: false, router: true */

window.Eduki = {
  Assets: {},
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    this.Assets = window.Assets;
    currentUser = Eduki.Models.CurrentUser.createFromCookie();
    router = new Eduki.Routers.Eduki();
    Backbone.history.start();
  }
};

$(document).ready(function () {
  Eduki.initialize();
});
