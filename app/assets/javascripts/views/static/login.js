Eduki.Views.Login = Backbone.View.extend({
  template: JST['static/login'],

  events: {
    "click #login-button": "authenticate"
  },

  render: function() {
    if (currentUser.authenticated) {
      router.route("/dashboard");
      return false;
    } else {
      $(this.el).html(this.template());
      this.$el.find("#error-area").hide();
      return this;
    }
  },

  authenticate: function(event) {
    event.preventDefault();
    var email = this.$el.find("#login-field-email").val();
    var password = this.$el.find("#login-field-password").val();
    currentUser.set_credentials(email, password);
    currentUser.authenticate(this.onAuthenticateSuccess,
                             this.onAuthenticateFailure, this);
    this.showLoading();
  },

  onAuthenticateSuccess: function(data) {
    this.hideLoading();
    currentUser.save();
    router.route("/dashboard");
  },

  onAuthenticateFailure: function(data) {
    this.hideLoading();
    this.$el.find("#error-area").show();
  }
});