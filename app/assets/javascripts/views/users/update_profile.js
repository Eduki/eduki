/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false,
  JST: false, router: false */
'use strict';

/*
 * Update User Profile View
 *
 * Author: Michael Abboud
 */

Eduki.Views.UpdateProfile = Backbone.View.extend({
  className: 'container',
  id: 'update',

  template: JST['users/update'],

  events: {
    'click button' : 'update',
    'click #email': 'hideInvalid',
    'keyup #password' : 'checkPassword',
    'keyup #confirm-password' : 'checkPassword',
  },

  initialize: function () {
    this.user = new Eduki.Models.User({ id: currentUser.id });
  },

  // grabs current user info from database and displays in the form
  // if it exists
  fetchUserInfo: function () {
    var self = this;
    // grab user from database
    this.user.fetch({
      success: function () {
        $(self.el).html(self.template());
        self.updateFields();
      },
      error: function (model, xhr, options) {
        router.route('/error');
      }
    });
  },

  // updates form fields
  updateFields: function () {
    this.$('#first-name').val(this.user.get('first_name'));
    this.$('#last-name').val(this.user.get('last_name'));
    this.$('#email').val(this.user.get('email'));
    this.$('#background').val(this.user.get('background'));
  },

  // Renders the template only if user is logged in
  // otherwise, routes them to the login page
  render: function (template) {
    var self;
    if (currentUser.authenticated) {
      this.fetchUserInfo();
      self = this;
    } else {
      router.route('/');
      self = false;
    }
    return self;
  },

  // Checks if the two passwords are the same
  checkPassword: function () {
    var password = this.$('#password').val();
    var confirmPassword = this.$('#confirm-password').val();
    var match = password === confirmPassword;

    // Only show error popups if both fields have text
    if (password && confirmPassword) {
      this.invalidPasswordError(match);
    }
    return match;
  },

  invalidPasswordError: function (match) {
    var popovers = this.$('#confirm-password').parent().find('.popover').length;
    if (popovers === 0 && !match) {
      this.showInvalid('confirm-password', 'Confirmation password doesn\'t match');
    } else if (match) {
      this.$('#confirm-password').popover('hide');
    }
  },

  // Update user's information in the database
  update: function () {
    this.user = new Eduki.Models.User({ id: currentUser.id,
                                        first_name: this.$('#first-name').val(),
                                        last_name: this.$('#last-name').val(),
                                        password: this.$('#password').val() || null,
                                        confirm_password: this.$('#confirm-password').val() || null,
                                        email: this.$('#email').val(),
                                        background: this.$('#background').val() });

    // updates user info
    // routes to dashboard on success
    // renders error page on error
    var self = this;
    if (this.user.isValid()) {
      this.user.save({id: this.user.get('id')},
                     {wait: true,
                      success: function () { router.route('/dashboard'); },
                      error: function () { router.route('/error'); }});
    } else {
      this.showInvalid(this.user.validationError[0], this.user.validationError[1]);
    }
  },

  // Hide validation error when input is clicked upon
  hideInvalid: function () {
    this.$('input').popover('hide');
  },

  // Make the popoever appear with an error message
  showInvalid: function (input, message) {
    this.$('#' + input).attr('data-content', message);
    this.$('#' + input).popover('show');
  },
});
