/*
 * Update User Profile View
 *
 * Author: Michael Abboud
 */

Eduki.Views.UpdateProfile = Backbone.View.extend({

  template: JST['users/update'],
  errorTemplate: JST['static/error'],

  events: {
    'click button' : 'update',
    'click #email': 'hideInvalid',
  },

  initialize: function() {
    // renders form, then updates all existing fields with the current profile values
    // if they exist
    this.render(this.template());
    this.fetchUserInfo();
  },

  // grabs current user info from database and displays in the form
  // if it exists
  fetchUserInfo: function() {
    this.user = new Eduki.Models.User({ id: currentUser.id });

    var self = this;
    // grab user from database
    this.user.fetch({
      success: function() {
        self.updateFields();
      },
      error: function(model, xhr, options) {
        self.render(self.errorTemplate());
      }
    });
  },

  // updates form fields
  updateFields: function() {
    this.$('#first-name').val(this.user.get('first_name'));
    this.$('#last-name').val(this.user.get('last_name'));
    this.$('#email').val(this.user.get('email'));
    this.$('#background').val(this.user.get('background'));
  },

  // Renders the template only if user is logged in
  // otherwise, routes them to the login page
  render: function(template) {
    if (currentUser.authenticated) {
      $(this.el).html(template);
      return this;
    } else {
      router.route('/login');
      return false;
    }
  },

  // Update user's information in the database
  update: function() {
    this.user = new Eduki.Models.User({ id: currentUser.id,
                                        first_name: this.$('#first-name').val(),
                                        last_name: this.$('#last-name').val(),
                                        email: this.$('#email').val(),
                                        background: this.$('#background').val() });

    // updates user info
    // routes to dashboard on success
    // renders error page on error
    var self = this;
    if (this.user.isValid()) {
      this.user.save({id: this.user.get('id')},
                     {wait: true,
                      success: function() { router.route('/dashboard') },
                      error: function() { self.render(self.errorTemplate()); }});
    } else {
      this.showInvalid(this.user.validationError[0],
                       this.user.validationError[1]);
    }
  },

  // Hide validation error when input is clicked upon
  hideInvalid: function() {
    this.$('input').popover('hide');
  },

  // Make the popoever appear with an error message
  showInvalid: function(input, message) {
    this.$('#' + input).attr('data-content', message);
    this.$('#' + input).popover('show');
  },
});
