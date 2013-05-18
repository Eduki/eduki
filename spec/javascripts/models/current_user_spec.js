// This describes a test suite for the Current User
// David Mah
describe("CurrentUser", function() {
  describe("create_from_cookie", function() {
    it("Creates a blank user if there is no cookie", function() {
      spyOn(jQuery, 'cookie').andReturn(undefined);
      current_user = Eduki.Models.CurrentUser.create_from_cookie();

      expect(current_user.email).toEqual("");
      expect(current_user.password).toEqual("");
      expect(jQuery.cookie).toHaveBeenCalledWith('current_user');
    });

    it("Creates a blank user if the cookie is invalid", function() {
      spyOn(jQuery, 'cookie').andReturn("{derp}");
      current_user = Eduki.Models.CurrentUser.create_from_cookie();

      expect(current_user.email).toEqual("");
      expect(current_user.password).toEqual("");
      expect(jQuery.cookie).toHaveBeenCalledWith('current_user');
    });

    it("Creates a current user with information in the cookie", function() {
      // Stub out cookie
      spyOn(jQuery, 'cookie').andReturn(
        "{\"email\":\"example_user\",\"password\":\"example_password\"}");
      current_user = Eduki.Models.CurrentUser.create_from_cookie();

      expect(current_user.email).toEqual("example_user");
      expect(current_user.password).toEqual("example_password");
      expect(jQuery.cookie).toHaveBeenCalledWith('current_user');
    });
  });

  var current_user;
  beforeEach(function() {
    current_user = new Eduki.Models.CurrentUser()
    current_user.email    = "test_user";
    current_user.password = "test_password";
  });

  describe("set_credentials", function() {
    it("changes the current user's email and password", function () {
      current_user.set_credentials("test_user_change", "test_password_change");
      expect(current_user.email).toEqual("test_user_change");
      expect(current_user.password).toEqual("test_password_change");
    });
  });

  describe("flush_credentials", function() {
    beforeEach(function() {
      jQuery.cookie("current_user", "some lousy preexisting data");
      current_user.flush_credentials();
    });

    it("clears the cookie", function () {
      expect(jQuery.cookie("current_user")).toEqual(undefined);
    });

    it("clears the current user's email and password", function () {
      expect(current_user.email).toEqual("");
      expect(current_user.password).toEqual("");
    });
  });
});
