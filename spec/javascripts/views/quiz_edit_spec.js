/*
 * quiz_edit_spec is a test suite for editing lessons
 *
 * author: Michael
 */

describe("Quiz Edit", function() {
	setupFakeServer();
	var view;

	beforeEach(function() {
		currentUser.id = 1;
    currentUser.authenticated = true;
    view = new Eduki.Views.QuizEdit({attributes:{course_id: 1, quiz_id: 1}});
	});

	describe("Render", function() {
		it("renders form title", function () {
      view.render();
      successServerResponses(this.server);
			expect(view.$el).toContain('#create-quiz-title');
		});

		it("renders existing problems", function() {
      view.render();
      successServerResponses(this.server);
			expect(view.$el.find('#problem-0').val()).toEqual("What is a corgi? A. Dog B. Cat C. Cow D. Derp");
			expect(view.$el.find('#problem-1').val()).toEqual("what is 1+1? A. 1 B. 2 C. 3 D. 0");
		});

		it("renders update button", function() {
      view.render();
      successServerResponses(this.server);
			expect(view.$el).toContain('#update');
		});

		it("renders error page on error", function() {
      view.render();
    	spyOn(router, 'route');
			serverRespond(this.server, 301, fixtures['course']);
      serverRespond(this.server, 200, fixtures['quizzes']);
      serverRespond(this.server, 200, fixtures['quiz']);
			expect(router.route).toHaveBeenCalledWith('/error');
		})
	});

	describe("Edit", function() {
		it("redirects to course overview on success", function() {
    	spyOn(router, 'route');
      view.render();
      successServerResponses(this.server);
			view.$('#update').click();
			serverRespond(this.server, 200, fixtures["quiz"]);
			expect(router.route).toHaveBeenCalledWith('/courses/1');
    });

    it('displays error on quiz save error', function() {
      view.render();
    	spyOn(router, 'route');
      successServerResponses(this.server);
			view.$('#update').click();
			serverRespond(this.server, 400, fixtures["quiz"]);
			expect(router.route).toHaveBeenCalledWith('/error');
    });
	})

  // Helper function to send back successful respones for all 3 api calls
  // necessary to render a quiz
  function successServerResponses(server) {
    serverRespond(server, 200, fixtures['course']);
    serverRespond(server, 200, fixtures['quiz']);
    serverRespond(server, 200, fixtures['enrollments']);
  }
});
