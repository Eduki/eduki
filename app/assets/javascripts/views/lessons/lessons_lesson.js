/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false,
  JST: false, router: false */
'use strict';

/*
 * Handles rendering a view for a single lesson
 *
 * author: Jolie Chen
 */
Eduki.Views.LessonsLesson = Backbone.View.extend({

  template: JST['lessons/lesson'],
  errorTemplate: JST['static/error'],

  initialize: function () {
    // Initialize models
    this.course = new Eduki.Models.Course({id: this.attributes.course_id});
    this.lesson = new Eduki.Models.Lesson({ course_id: this.attributes.course_id,
                                            id: this.attributes.lesson_id });
    this.lessons = new Eduki.Collections.Lessons({course_id: this.lesson.get('course_id')});

    // Fetch course and lessons. Once retrieved, execute
    // render through the callback to display them.
    var self = this;
    this.course.fetch({
      success: function () {
        self.renderLesson();
      },
      error: function (model, xhr, options) {
        self.render(self.errorTemplate());
      }
    });
  },

  // renders lesson body, upon success, renders the lesson list
  renderLesson: function () {
    var self = this;
    this.lesson.fetch({
      success: function () {
        self.renderLessonsList();
      },
      error: function (model, xhr, options) {
        self.render(self.errorTemplate);
      }
    });
  },

  // renders the lesson list in the sidebar
  renderLessonsList: function () {
    var self = this;
    this.lessons.fetch({
      success: function () {
        self.render(self.template());
      },
      error: function (model, xhr, options) {
        self.render(self.errorTemplate);
      }
    });
  },

  // Renders an individual lesson
  render: function (template) {
    $(this.el).html(template);
    return this;
  },
});
