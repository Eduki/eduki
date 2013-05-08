Eduki.Views.LessonsLesson = Backbone.View.extend({

  template: JST['lessons/lesson'],

  initialize: function() {
    this.course = new Eduki.Models.Course({id: this.attributes.course_id});

    this.lesson = new Eduki.Models.Lesson({ course_id: this.attributes.course_id,
                                            id: this.attributes.lesson_id });

    this.lessons = new Eduki.Collections.Lessons(this.lesson.get('course_id'));
    this.lessons.url = '/api/courses/' + this.lesson.get('course_id') + '/lessons';

    // Fetch all lessons. Once retrieved, execute
    // render through the callback to display them.
    var self = this;
    $.when(this.course.fetch(),
           this.lesson.fetch(),
           this.lessons.fetch()).done(function() { self.render(); });
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

});
