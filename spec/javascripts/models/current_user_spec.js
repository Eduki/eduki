// This describes a test suite for the Current User
// David Mah
var CURRENT_USER_COOKIE = "currentUser";
describe("CurrentUser", function() {
  describe("createFromCookie", function() {
    it("Creates a blank user if there is no cookie", function() {
      spyOn(jQuery, 'cookie').andReturn(undefined);
      currentUser = Eduki.Models.CurrentUser.createFromCookie();

      expect(currentUser.email).toEqual("");
      expect(jQuery.cookie).toHaveBeenCalledWith(CURRENT_USER_COOKIE);
    });

    it("Creates a blank user if the cookie is invalid", function() {
      spyOn(jQuery, 'cookie').andReturn("{derp}");
      currentUser = Eduki.Models.CurrentUser.createFromCookie();

      expect(currentUser.email).toEqual("");
      expect(jQuery.cookie).toHaveBeenCalledWith(CURRENT_USER_COOKIE);
    });

    it("Creates a current user with information in the cookie", function() {
      // Stub out cookie
      spyOn(jQuery, 'cookie').andReturn(
        "{\"id\":42,"
        + "\"email\":\"example_user\","
        + "\"authenticated\":true}");
      currentUser = Eduki.Models.CurrentUser.createFromCookie();

      expect(currentUser.email).toEqual("example_user");
      expect(currentUser.id).toEqual(42);
      expect(currentUser.authenticated).toEqual(true);
      expect(jQuery.cookie).toHaveBeenCalledWith(CURRENT_USER_COOKIE);
    });
  });

  var currentUser;
  beforeEach(function() {
    currentUser = new Eduki.Models.CurrentUser();
    currentUser.email    = "test_user";
    currentUser.password = "test_password";
  });

  describe("set_credentials", function() {
    it("changes the current user's email and password", function () {
      currentUser.set_credentials("test_user_change", "test_password_change");
      expect(currentUser.email).toEqual("test_user_change");
      expect(currentUser.password).toEqual("test_password_change");
    });
  });

  describe("flush_credentials", function() {
    beforeEach(function() {
      jQuery.cookie(CURRENT_USER_COOKIE, "some lousy preexisting data");
      currentUser.flush_credentials();
    });

    it("clears the cookie", function () {
      expect(jQuery.cookie(CURRENT_USER_COOKIE)).toEqual(undefined);
    });

    it("clears the current user's email and password", function () {
      expect(currentUser.email).toEqual("");
      expect(currentUser.password).toEqual("");
    });
  });
});
