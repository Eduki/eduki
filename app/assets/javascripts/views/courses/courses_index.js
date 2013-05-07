Eduki.Views.CoursesIndex = Backbone.View.extend({

  template: JST['courses/index'],

  initialize: function() {
    // Fetch all courses. Once retrieved, execute
    // render through the callback to display them.
    this.courses = new Eduki.Collections.Courses();
    this.courses.on('sync', this.render, this);
    this.courses.fetch()
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },
});
