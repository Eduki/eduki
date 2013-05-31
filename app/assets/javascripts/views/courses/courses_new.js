/*
 * Renders and controls course creation page
 *
 * author: Jolie
 */

Eduki.Views.CoursesNew = Backbone.View.extend({

  template: JST['courses/new'],
  errorTemplate: JST['static/error'],
  successTemplate: JST['courses/success'],

  events: {
    'click button' : 'create',
    'click textarea' : 'hideInvalid',
    'click input' : 'hideInvalid',
    'keyup textarea' : 'updateRemaining',
  },

  updateRemaining: function() {
    this.$('#remaining').html(500-this.$('#create-course-description').val().length);
  },

  initialize: function() {
    // Fetch all courses. Once retrieved, execute
    // render through the callback to display them.
    this.render(this.template());
  },

  // Renders the template
  render: function(template) {
    $(this.el).html(template);
    return this;
  },

  create: function() {
    this.course = new Eduki.Models.Course({title: this.$('#create-course-title').val(),
                                           description:  this.$('#create-course-description').val()});
    if (this.course.isValid()) {
      var self = this;
      this.course.save({title: this.course.get('title')},
                       {wait: true,
                        success: function() { router.route("/courses/" + self.course.get('id')); },
                        error: function() { self.render(self.errorTemplate()); }});
    } else {
      this.showInvalid(this.course.validationError[0], this.course.validationError[1]);
    }
  },

  // Hide validation error when input is clicked upon
  hideInvalid: function() {
    this.$('input').popover('hide');
    this.$('textarea').popover('hide');
  },

  showInvalid: function(input, message) {
    this.$('#' + input).attr('data-content', message);
    this.$('#' + input).popover('show');
  },
});
