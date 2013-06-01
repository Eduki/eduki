/*
 * Describes the behaviors of the profile update page
 *
 * author: Michael Abboud
 */

describe("Profile Update", function () {

	setupFakeServer();
	var view;

	beforeEach(function() {
		currentUser.id = 1;
    currentUser.authenticated = true;
    view = new Eduki.Views.UpdateProfile();
	});

	describe("Renders Form", function () {
		it("has user info form", function() {
			expect(view.$el).toContain('#first-name');
			expect(view.$el).toContain('#last-name');
			expect(view.$el).toContain('#email');
			expect(view.$el).toContain('#background');
		});
	});
});