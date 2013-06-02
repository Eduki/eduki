// This model represents the currently logged in user
// It is meant to be used as a singleton that can be referenced by the world
// variable **currentUser**.
// A few fields to use:
// currentUser.authenticated:boolean - True if logged in
//
// David Mah
Eduki.Models.CurrentUser = Backbone.Model.extend({
  COOKIE_KEY: "currentUser",
  urlRoot: "/api/authenticate",
  id: -1,
  email: "",
  password: "",
  authenticated: false,

  initialize: function() {
  },

  // Save to cookie, because there isn't anything server like about this
  save: function() {
    var user_data = {
      id: this.id,
      email: this.email,
      authenticated: this.authenticated
    };
    var serialized_user_data = JSON.stringify(user_data);
    $.cookie(this.COOKIE_KEY, serialized_user_data);
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
  },

  // Clears identifying user information from the machine
  flush_credentials: function() {
    this.id = -1;
    this.email = "";
    this.password = "";
    this.authenticated = false,
    this.clear();
    $.removeCookie(this.COOKIE_KEY);
  },

  // Sends an authentication request to the server
  // If it succeeds, calls success_callback
  // If it fails, calls error_callback
  authenticate: function(successCallback, errorCallback, callbackContext) {
    $.ajax({
      url: currentUser.urlRoot,
      type: 'GET',
      username: this.email,
      password: this.password,
      success: function(data) {
        currentUser.authenticated = true;
        currentUser.id = data.id;
        successCallback.call(callbackContext);
      },
      error: errorCallback,
      context: callbackContext
    });
    this.password = "";
  }

});

  // Creates and returns a CurrentUser object from serialized CurrentUser
  // data in the COOKIE_KEY
  // { email: ------, password: ------, authenticated: true/false, id: -- }
Eduki.Models.CurrentUser.createFromCookie = function() {
    var user = new Eduki.Models.CurrentUser();
    try {
      var serializedUserData = $.cookie(user.COOKIE_KEY);
      var userData = JSON.parse(serializedUserData);
      user.set_credentials(userData.email, userData.password);
      user.id = userData.id;
      user.authenticated = userData.authenticated;
      user.enable();
    } catch (exception) {
      // Probably there is no cookie, or the cookie is badly constructed
      // Regardless of the error that occurred... just reset the state
      user.flush_credentials();
    } finally {
      return user;
    }
}
