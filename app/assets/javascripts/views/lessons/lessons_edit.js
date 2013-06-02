/*
 * Handles editing page for lessons
 *
 * author: Michael
 */

Eduki.Views.LessonsEdit = Backbone.View.extend({

  template: JST['lessons/edit'],
  errorTemplate: JST['static/error'],

  events: {
  	'click button' : 'update',
    'click input' : 'hideInvalid',
    'click textarea' : 'hideInvalid'
  },

  initialize: function() {
    // renders form, then updates all existing fields with the current lesson values
    // if they exist
    this.lesson = new Eduki.Models.Lesson({ course_id: this.attributes.course_id,
                                            id: this.attributes.lesson_id });
    this.fetchLessonInfo();
  },

  // grabs current lesson info from database and displays in the form
  // if it exists
  fetchLessonInfo: function() {
  	var self = this;
  	this.lesson.fetch({
      success: function() {
      	// only updates fields if template is rendered correctly
        if (self.render(self.template)) {
        	self.updateFields();
        }
      },
      error: function() {
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
  	this.$('#form-lesson-title').val(this.lesson.get('title'));
    this.$('#form-lesson-body').val(this.lesson.get('body'));
  },

  update: function() {
  	this.lesson = new Eduki.Models.Lesson({ id: this.lesson.get('id'),
  																					course_id: this.lesson.get('course_id'),
                                            title: this.$('#form-lesson-title').val(),
                                            body: this.$('#form-lesson-body').val() });

    // updates lesson info
    // routes to dashboard on success
    // renders error page on error
    var self = this;
    if (this.lesson.isValid()) {
      this.lesson.save({id: this.lesson.get('id')},
                     {wait: true,
                      success: function() { router.route('/courses/' + self.lesson.get('course_id') 
                      																	 + '/lessons/' + self.lesson.get('id')) },
                      error: function() { self.render(self.errorTemplate()); }});
    } else {
      this.showInvalid(this.lesson.validationError[0],
                       this.lesson.validationError[1]);
    }
  },

  // Hide validation error when input is clicked upon
  hideInvalid: function() {
    this.$('input').popover('hide');
    this.$('textarea').popover('hide');
  },

  // Make the popoever appear with an error message
  showInvalid: function(input, message) {
    this.$('#' + input).attr('data-content', message);
    this.$('#' + input).popover('show');
  },
});
