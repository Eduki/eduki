Eduki.Views.CoursesIndex = Backbone.View.extend({

  template: JST['courses/index'],
  errorTemplate: JST['static/error'],

  // Fetch all courses. Once retrieved, execute
  // render through the callback to display them.
  initialize: function() {
    this.courses = new Eduki.Collections.Courses();
    var self = this;
    $.when(this.courses.fetch()).then(
             function() { self.render(self.template()); },
             function() { self.render(self.errorTemplate()); }
           );
  },

  // Renders the course
  render: function(template) {
    $(this.el).html(template);
    return this;
  },
});
