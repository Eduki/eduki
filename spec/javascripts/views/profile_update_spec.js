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
		it("redirects if user isn't logged in", function() {
      spyOn(router, 'route');
      currentUser.id = -1;
      currentUser.authenticated = false;
      view = new Eduki.Views.UpdateProfile();
			serverRespond(this.server, 200, fixtures["user"]);
      expect(router.route).toHaveBeenCalledWith('/');
		});

		it("has user info form", function() {
			serverRespond(this.server, 200, fixtures["user"]);
			expect(view.$el).toContain('#first-name');
			expect(view.$el).toContain('#last-name');
			expect(view.$el).toContain('#email');
			expect(view.$el).toContain('#password');
			expect(view.$el).toContain('#confirm-password');
			expect(view.$el).toContain('#background');
			expect(view.$el).toContain('#submit-update');
		});

		it("loads user info that is present", function() {
			serverRespond(this.server, 200, fixtures["user"]);
			expect(view.$el.find('#email').val()).toEqual('derp@derpette.com');
			expect(view.$el.find('#first-name').val()).toEqual('derp');
			expect(view.$el.find('#last-name').val()).toEqual('derpette');
			expect(view.$el.find('#background').val()).toEqual('I like corgis.');
			expect(view.$el.find('#password').val()).toEqual('');
			expect(view.$el.find('#confirm-password').val()).toEqual('');
		});

    it("displays popover if passwords don't match", function() {
			serverRespond(this.server, 200, fixtures["user"]);
			view.$('#password').val('derp');
			view.$('#confirm-password').val('derpa');
			view.$('#submit-update').click();
			expect(view.$('.popover')).toHaveText('Confirmation password doesn\'t match');
    });

    it("displays popover if passwords don't match", function() {
			serverRespond(this.server, 200, fixtures["user"]);
			view.$('#password').val('derp');
			view.$('#confirm-password').val('');
			view.$('#submit-update').click();
			expect(view.$('.popover')).toHaveText('Confirmation password doesn\'t match');
    });

    it("displays popover if passwords don't match", function() {
			serverRespond(this.server, 200, fixtures["user"]);
			view.$('#password').val('derpa');
			view.$('#confirm-password').val('derp');
			view.$('#submit-update').click();
			expect(view.$('.popover')).toHaveText('Confirmation password doesn\'t match');
    });

    it("submits if password is empty", function() {
			spyOn(router, 'route');
			serverRespond(this.server, 200, fixtures["user"]);
			view.$('#first-name').val('derpina');
			view.$('#submit-update').click();
			serverRespond(this.server, 200, fixtures["user"]);
			expect(router.route).toHaveBeenCalled();
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
			view.$('#submit-update').click();
			expect(view.$('.popover')).toHaveText('Please provide a valid email address');
		});

		it("routes user to dashboard on success", function() {
			spyOn(router, 'route');
			serverRespond(this.server, 200, fixtures["user"]);
			view.$('#first-name').val('derpina');
			view.$('#submit-update').click();
			serverRespond(this.server, 200, fixtures["user"]);
			expect(router.route).toHaveBeenCalled();
		});
	});

});
