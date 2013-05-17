Eduki.Models.CurrentUser = Backbone.Model.extend({
  COOKIE_KEY: "current_user",
  AUTHENTICATE_URL: "/api/authenticate",
  username: "",
  password: "",
  initialize: function() {
  },

  // Save to cookie, because there isn't anything server like about this
  save: function() {
    var user_data = {
      username: this.username,
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
    Backbone.BasicAuth.set(this.username, this.password);
  },

  // Sets it such that all backbone retrievals no longer use basic
  // authentication
  disable: function() {
    Backbone.BasicAuth.clear();
  },

  // Assigns identifying user information and saves it to a cookie
  set_credentials: function(username, password) {
    this.username = username;
    this.password = password;
    this.save();
  },

  // Clears identifying user information from the machine
  flush_credentials: function() {
    this.username = "";
    this.password = "";
    this.clear();
  }

});

  // Creates and returns a CurrentUser object from serialized CurrentUser
  // data in the COOKIE_KEY
  // { username: ------, password: ------ }
Eduki.Models.CurrentUser.create_from_cookie = function() {
  var user = new Eduki.Models.CurrentUser();
    try {
      serialized_user_data = $.cookie(user.COOKIE_KEY);
      user_data = JSON.parse(serialized_user_data);
      user.username = user_data.username;
      user.password = user_data.password;
      user.enable();
    } catch (exception) {
      // There is no cookie, or the cookie is badly constructed
      console.log(exception + " => " + exception.message);
    } finally {
      return user;
    }
}
