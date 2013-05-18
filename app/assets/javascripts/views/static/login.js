Eduki.Views.Login = Backbone.View.extend({
  template: JST['static/login'],

  events: {
    "click #login-button": "authenticate"
  },

  render: function() {
    $(this.el).html(this.template());
    this.$el.find("#error-area").hide();
    return this;
  },

  authenticate: function(event) {
    event.preventDefault();
    var email = this.$el.find("#login-field-email").val()
    var password = this.$el.find("#login-field-password").val()
    currentUser.set_credentials(email, password);
    currentUser.authenticate(this.onAuthenticateSuccess,
                             this.onAuthenticateFailure, this);
  },

  onAuthenticateSuccess: function(data) {

  },

  onAuthenticateFailure: function(data) {
    window.data = data;
    currentUser.save();
    console.log(this.$el.html());
    this.$el.find("#error-area").show();
    console.log(this.$el.html());
  }
});
