Eduki.Models.CurrentUser = Backbone.Model.extend({
  COOKIE_KEY: "current_user",
  AUTHENTICATE_URL: "/api/authenticate",
  email: "",
  password: "",
  initialize: function() {
  },

  // Save to cookie, because there isn't anything server like about this
  save: function() {
    var user_data = {
      email: this.email,
      password: this.password
    }
    var serialized_user_data = JSON.stringify(user_data);
    $.cookie(this.COOKIE_KEY, serialized_user_data);
  },

  // Flush cookie, removing state that the web browser was logged in
  clear: function() {
    $.removeCookie(this.COOKIE_KEY);
  },

  // Sets it such that all backbone retrievals use the current user's
  // credentials with basic authentication
  enable: function() {
    Backbone.BasicAuth.set(this.email, this.password);
  },

  // Sets it such that all backbone retrievals no longer use basic
  // authentication
  disable: function() {
    Backbone.BasicAuth.clear();
  },

  // Assigns identifying user information and saves it to a cookie
  set_credentials: function(email, password) {
    this.email = email;
    this.password = password;
    this.save();
  },

  // Clears identifying user information from the machine
  flush_credentials: function() {
    this.email = "";
    this.password = "";
    this.clear();
  },

  authenticate: function() {
    
  }

});

  // Creates and returns a CurrentUser object from serialized CurrentUser
  // data in the COOKIE_KEY
  // { email: ------, password: ------ }
Eduki.Models.CurrentUser.create_from_cookie = function() {
  var user = new Eduki.Models.CurrentUser();
    try {
      serialized_user_data = $.cookie(user.COOKIE_KEY);
      user_data = JSON.parse(serialized_user_data);
      user.email = user_data.email;
      user.password = user_data.password;
      user.enable();
    } catch (exception) {
      // Probably there is no cookie, or the cookie is badly constructed
      // Regardless of the error that occurred... just reset the state
      user.flush_credentials();
    } finally {
      return user;
    }
}
