/* 
 * Renders and controls course creation page
 *
 * author: Jolie
 */
Eduki.Views.CoursesNew = Backbone.View.extend({

  template: JST['courses/new'],
  errorTemplate: JST['static/error'],
  invalidTemplate: JST['courses/error'],
  createdTemplate: JST['courses/created'],

  events: {
    'click button' : 'create'
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
    this.course = new Eduki.Models.Course({ title: this.$('#create-course-name').val() });
    if (this.course.isValid()) {
      var self = this;
      this.course.save({title: this.course.get('title')},
                       {wait: true,
                        success: function() { self.render(self.createdTemplate()); },
                        error: function() { self.render(self.errorTemplate()); }});
    } else {
      this.$('input').after(this.invalidTemplate());
    }

  }
});
