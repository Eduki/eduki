/*
 * Handles editing page for courses
 *
 * author: Michael
 */

Eduki.Views.CoursesEdit = Backbone.View.extend({

  template: JST['courses/edit'],
  errorTemplate: JST['static/error'],

  events: {
  	'click button' : 'update',
    'click input' : 'hideInvalid',
    'keyup textarea' : 'updateRemaining'
  },

  initialize: function() {
    this.course = new Eduki.Models.Course({ id: this.attributes.course_id });
    this.fetchCourseInfo();
  },

  // grabs current course info from database and displays in the form
  // if it exists
  fetchCourseInfo: function() {
  	var self = this;
  	this.course.fetch({
      success: function() {
      	// only updates fields if template is rendered correctly
        if (self.render(self.template())) {
        	self.updateFields();
        } else {
          self.render(self.errorTemplate());
        }
      },
      error: function(model, xhr, options) {
        self.render(self.errorTemplate)
      }
    });
  },

  // Renders the template only if user is logged in
  // otherwise, routes them to the login page
  render: function(template) {
    if (currentUser.authenticated) {
      $(this.el).html(template);
      return this;
    } else {
      router.route('/');
      return false;
    }
  },

  updateFields: function() {
    this.$('#form-course-title').val(this.course.get('title'));
    this.$('#form-course-description').val(this.course.get('description'));
    this.updateRemaining();
  },

  update: function() {
  	this.course = new Eduki.Models.Course({ id: this.course.get('id'),
  																					title: this.$('#form-course-title').val(),
                                            description: this.$('#form-course-description').val() });

    // updates course info
    // routes to dashboard on success
    // renders error page on error
    var self = this;
    if (this.course.isValid()) {
      this.course.save({id: this.course.get('id')},
                     {wait: true,
                      success: function() { router.route('/courses/' + self.course.get('id')) },
                      error: function() { self.render(self.errorTemplate()); }});
    } else {
      this.showInvalid(this.course.validationError[0],
                       this.course.validationError[1]);
    }
  },

  // Hide validation error when input is clicked upon
  hideInvalid: function() {
    this.$('input').popover('hide');
  },

  // Make the popoever appear with an error message
  showInvalid: function(input, message) {
    this.$('#' + input).attr('data-content', message);
    this.$('#' + input).popover('show');
  },

  updateRemaining: function() {
    this.$('#remaining').html(500-this.$('#form-course-description').val().length);
  },
});