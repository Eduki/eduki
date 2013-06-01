/*
 * Renders and controls lesson creation page
 * 
 * author: Michael
 */

Eduki.Views.LessonsCreate = Backbone.View.extend({

	template: JST['lessons/new'],
  errorTemplate: JST['static/error'],
  createdTemplate: JST['lessons/created'],

  events: {
    'submit form' : 'create',
    'click #publish' : 'create',
    'click input' : 'hideInvalid'
  },

  initialize: function() {
    this.render(this.template());
    this.cid = this.attributes.course_id;
  },

  // Renders the create lesson form
  render: function(template) {
    $(this.el).html(template);
    return this;
  },

  // handles the form submission, displays appropriate pages on success/error
  create: function(e) {
    e.preventDefault();
    this.lesson = new Eduki.Models.Lesson({ title: this.$('#create-lesson-title').val(),
                                            body: this.$('#create-lesson-body').val(),
                                            course_id: this.cid });
    if (this.lesson.isValid()) {
      var self = this;
      $.when(this.lesson.save()).then(
              function() { router.route('/courses/' +
                                        self.lesson.get('course_id') +
                                        '/lessons/' +
                                        self.lesson.get('id')); },
              function() { self.render(self.errorTemplate()); }
            );
    } else {
      console.log(this.lesson.get('title'));
      this.showInvalid(this.lesson.validationError[0], this.lesson.validationError[1]);
    }
  },

  // Show error message
  showInvalid: function(input, message) {
    this.$('#' + input).attr('data-content', message);
    this.$('#' + input).popover('show');
  },

  // Hide validation error when input is clicked upon
  hideInvalid: function() {
    this.$('input').popover('hide');
    this.$('textarea').popover('hide');
  },
});
