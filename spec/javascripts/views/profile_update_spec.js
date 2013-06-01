/*
 * Describes the behaviors of the profile update page
 *
 * author: Michael Abboud
 */

describe("Profile Update", function () {
	var view;
	setupFakeServer();
	beforeEach(function() {
		view = new Eduki.Views.UpdateProfile();
		view.initialize();
	});

	describe("Renders Form", function () {
		it("has user info form", function() {
			expect(view.$el).toContain('#first-name');
		});
	});
});