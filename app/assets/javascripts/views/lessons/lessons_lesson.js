/*
 * Handles rendering a view for a single lesson
 *
 * author: Jolie Chen
 */
Eduki.Views.LessonsLesson = Backbone.View.extend({
  className: 'container',
  template: JST['lessons/lesson'],

  initialize: function() {
    // Initialize models

    var cid = this.attributes.course_id;
    this.course = new Eduki.Models.Course({id: cid});
    this.lesson = new Eduki.Models.Lesson({ course_id: cid,
                                            id: this.attributes.lesson_id });
    this.lessons = new Eduki.Collections.Lessons({course_id: cid});
  },

  // Renders an individual lesson
  render: function() {
    this.fetchData();
    return this;
  },

  fetchData: function() {
    var self = this;
    $.when(this.course.fetch(),
           this.lesson.fetch(),
           this.lessons.fetch()).then(
      function() { $(self.el).html(self.template()); },
      function() { router.route('/error'); }
      );
  },
});
