Eduki.Views.CoursesIndex = Backbone.View.extend({

  template: JST['courses/index'],
  errorTemplate: JST['static/error'],

  // Fetch all courses. Once retrieved, execute
  // render through the callback to display them.
  initialize: function(query) {
    this.courses = new Eduki.Collections.Courses();
    var self = this;
    var retrievalFunction = this.courses.fetch;
    var courses = this.courses

    // If there is a search query param, use that
    if (query !== undefined) {
      retrievalFunction = function() { return courses.search(query) };
    } else {
      retrievalFunction = function() { return courses.fetch() };
    }

    $.when(retrievalFunction()).then(
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
