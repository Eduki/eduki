Eduki.Views.CoursesOverview = Backbone.View.extend({

  template: JST['courses/overview'],
  errorTemplate: JST['static/error'],

  initialize: function() {
    this.course = new Eduki.Models.Course({id: this.attributes.course_id});
    this.lessons = new Eduki.Collections.Lessons(this.course.get('id'));
    this.lessons.url = '/api/courses/' + this.course.get('id') + '/lessons';

    // Fetch course and all its lessons. Once retrieved, execute
    // render through the callback to display them.
    var self = this;
    $.when(this.course.fetch(),
           this.lessons.fetch()).then(
             function() { self.render(); },
             function() { self.renderError(); }
           );
  },

  // Renders a course's lesson
  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  // Renders an error message
  renderError: function() {
    this.message = (this.lesson.get('message'));
    $(this.el).html(this.errorTemplate());
    return this;
  }
});
