/*
 * Static View/Controller for Main Page
 *
 * Author: Jolie Chen
 */

Eduki.Views.StaticIndex = Backbone.View.extend({

  template: JST['static/index'],
  events: {
    'click .toggle': 'toggleForm',
    'click #submit-credentials': 'submit',
    'submit form': 'submit',
    'click input': 'hideInvalid',
  },

  initialize: function() {
    // nothing to initialize
  },

  render: function() {
    if (currentUser.authenticated) {
      router.route('/dashboard');
      return false;
    } else {
      $(this.el).html(this.template());
      this.$el.find('#error-area').hide();
      return this;
    }
  },

  // Toggles the form between signup and login view
  toggleForm: function() {
    var type = 'login';
    if (this.$('form').attr('id') == 'login')
      type = 'signup'

    this.$('form').attr('id', type);
    this.$('#form-title').html(type);
    this.$('button span').html(type);
    this.$('.toggle').attr('id', 'toggle-' + type);
  },

  // Validate user's credentials for valid email and non-empty password
  submit: function(e) {
    e.preventDefault();
    this.user = new Eduki.Models.User({ email: this.$('#email').val(),
                                        password: this.$('#password').val() });

    // See if proper-formed credentials
    if (!this.user.isValid()) {
      this.showInvalid(this.user.validationError[0],
                       this.user.validationError[1]);
    } else if (this.$('form').attr('id') == 'signup') {
      this.signup();
    } else {
      this.login();
    }
  },

	// handles the form submission, displays appropriate pages on success/error
  signup: function() {
		var self = this;

    // Saves user to database
    this.user.save({email: this.user.get('email')},
                   {wait: true,
                    success: function() {
                      self.login();
                    },
                    error: function(model, xhr, options) {
                      if (xhr.status == 409)
                        self.showInvalid('email', 'Email already exists');
                      else
                        self.render(self.errorTemplate());
                    }});

  },

  // Hide validation error when input is clicked upon
  hideInvalid: function() {
    this.$('input').popover('hide');
  },

  showInvalid: function(input, message) {
    this.$('#' + input).attr('data-content', message);
    this.$('#' + input).popover('show');
  },

  login: function() {
    currentUser.set_credentials(this.user.get('email'),
                                this.user.get('password'));
    currentUser.authenticate(this.onAuthenticateSuccess,
                             this.onAuthenticateFailure, this);
  },

  onAuthenticateSuccess: function(data) {
    this.hideLoading();
    currentUser.save();
    router.route('/dashboard');
  },

  onAuthenticateFailure: function(data) {
    this.hideLoading();
    this.$('#submit-credentials').attr('data-content', 'Incorrect Username/Password');
    this.$('#submit-credentials').popover('show');
  }
});
