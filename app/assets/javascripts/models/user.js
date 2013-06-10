/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false, */
'use strict';

/*
 * User model
 *
 * author: Michael
 */

Eduki.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users/',

  // basic email validation and password validation. Checks to see if there is
  // only 1 @ symbol, and if it is not the first character in the email. Also
  // checks to see if there is a '.' followed by at least one character.
  validate: function (attrs, options) {
    var pattern = /.+@{1}.+\..+/;
    var errorMsg;
    if (!pattern.test(attrs.email)) {
      errorMsg = ['email', 'Please provide a valid email address'];
    } else if (attrs.password === "") {
      errorMsg = ['password', 'Please provide a password'];
    } else if (attrs.confirm_password !== undefined &&
               attrs.password !== attrs.confirm_password) {
      errorMsg = ['confirm-password', 'Confirmation password doesn\'t match'];
    }
    return errorMsg;
  }
});
