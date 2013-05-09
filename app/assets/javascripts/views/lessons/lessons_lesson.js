Eduki.Views.LessonsLesson = Backbone.View.extend({

  template: JST['lessons/lesson'],
  errorTemplate: JST['static/error'],

  initialize: function() {
    this.course = new Eduki.Models.Course({id: this.attributes.course_id});
    this.lesson = new Eduki.Models.Lesson({ course_id: this.attributes.course_id,
                                            id: this.attributes.lesson_id });
    this.lessons = new Eduki.Collections.Lessons(this.lesson.get('course_id'));
    this.lessons.url = '/api/courses/' + this.lesson.get('course_id') + '/lessons';

    // Fetch course and lessons. Once retrieved, execute
    // render through the callback to display them.
    var self = this;
    $.when(this.course.fetch(),
           this.lesson.fetch(),
           this.lessons.fetch()).then(
             function() { self.render(); },
             function() { self.renderError(); }
           );
  },

  // Renders an individual lesson
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
