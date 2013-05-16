/*
 * Handles rendering a view for a single lesson
 *
 * author: Jolie Chen
 */
Eduki.Views.LessonsLesson = Backbone.View.extend({

  template: JST['lessons/lesson'],
  errorTemplate: JST['static/error'],

  initialize: function() {
    // Initialize models
    this.course = new Eduki.Models.Course({id: this.attributes.course_id});
    this.lesson = new Eduki.Models.Lesson({ course_id: this.attributes.course_id,
                                            id: this.attributes.lesson_id });
    this.lessons = new Eduki.Collections.Lessons(this.lesson.get('course_id'));
    this.lessons.url = '/api/courses/' + this.lesson.get('course_id') + '/lessons';

    // Fetch course and lessons. Once retrieved, execute
    // render through the callback to display them.
    var self = this;
    $.when(this.course.fetch(),
           this.lessons.fetch()).then(
             function() { self.lesson = self.lessons.get(self.lesson.get('id'));
                          self.render(self.template()); },
             function() { self.render(self.errorTemplate()); }
           );
  },

  // Renders an individual lesson
  render: function(template) {
    $(this.el).html(template);
    return this;
  },
});
