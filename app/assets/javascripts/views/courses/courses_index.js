Eduki.Views.CoursesIndex = Backbone.View.extend({

  template: JST['courses/index'],
  errorTemplate: JST['static/error'],

  initialize: function() {
    // Fetch all courses. Once retrieved, execute
    // render through the callback to display them.
    this.courses = new Eduki.Collections.Courses();
    this.courses.on('sync', this.render, this);
    this.courses.fetch()
  },

  // Renders the course
  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  // Renders an error message
  renderError: function() {
    this.message = (this.courses.get('message'));
    $(this.el).html(this.errorTemplate());
    return this;
  }
});
