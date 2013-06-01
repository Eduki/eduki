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

		it("loads user info that is present", function() {
			serverRespond(this.server, 200, fixtures["user"]);
			expect(view.$el.find('#email').val()).toContain('derp@derpette.com');
			expect(view.$el.find('#first-name').val()).toContain('derp');
			expect(view.$el.find('#last-name').val()).toContain('derpette');
		});

		it("displays error page", function() {
			serverRespond(this.server, 200, fixtures["user"]);
			view.$('#submit-update').click();
			serverRespond(this.server, 400, fixtures["user"]);
			expect(view.$el.find('h1')).toHaveText('Woops! Something went wrong.');
		});

		it("displays popover with invalid email", function() {
			serverRespond(this.server, 200, fixtures["user"]);
			view.$('#email').val('askhj');
			
		});
	});

	// describe("Handles usage", function() {
	// 	it("")
	// });
});