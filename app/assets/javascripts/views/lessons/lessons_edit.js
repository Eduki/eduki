/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false,
  JST: false, router: false */
'use strict';

/*
 * Handles editing page for lessons
 *
 * author: Michael
 */

Eduki.Views.LessonsEdit = Backbone.View.extend({
  className: 'container',
  template: JST['lessons/edit'],
  previewTemplate: JST['lessons/preview'],

  events: {
    'click #publish' : 'publish',
    'click #preview' : 'preview',
    'click input' : 'hideInvalid',
    'click textarea' : 'hideInvalid',
    'click #edit': 'edit'
  },

  initialize: function () {
    // renders form, then updates all existing fields with the current lesson values
    // if they exist
    this.lesson = new Eduki.Models.Lesson({ course_id: this.attributes.course_id,
                                            id: this.attributes.lesson_id });
  },

  // Renders the template only if user is logged in
  // otherwise, routes them to the login page
  render: function () {
    var self;
    if (currentUser.authenticated) {
      this.fetchLessonInfo();
      self = this;
    } else {
      router.route('/');
      self = false;
    }
    return self;
  },

  // grabs current lesson info from database and displays in the form
  // if it exists
  fetchLessonInfo: function () {
    var self = this;
    this.lesson.fetch({
      success: function () { self.updateFields(); },
      error: function () { router.route('/error'); }
    });
  },

  updateFields: function () {
    $(this.el).html(this.template());
    this.$('#form-lesson-title').val(this.lesson.get('title'));
    this.$('#form-lesson-body').val(this.lesson.get('body'));
  },

  publish: function () {
    this.lesson = new Eduki.Models.Lesson({ id: this.lesson.get('id'),
                                            course_id: this.lesson.get('course_id'),
                                            title: this.$('#form-lesson-title').val(),
                                            body: this.$('#form-lesson-body').val() });

    // updates lesson info
    // routes to dashboard on success
    // renders error page on error
    var self = this;
    if (this.lesson.isValid()) {
      this.lesson.save({id: this.lesson.get('id')},
                     {wait: true,
                      success: function () { router.route('/courses/' + self.lesson.get('course_id') +
                                                          '/lessons/' + self.lesson.get('id')); },
                      error: function () { router.route('/error'); }});
    } else {
      this.showInvalid(this.lesson.validationError[0],
                       this.lesson.validationError[1]);
    }
  },

  // Hide validation error when input is clicked upon
  hideInvalid: function () {
    this.$('input').popover('hide');
    this.$('textarea').popover('hide');
  },

  // Make the popoever appear with an error message
  showInvalid: function (input, message) {
    this.$('#' + input).attr('data-content', message);
    this.$('#' + input).popover('show');
  },

  preview: function () {
    var self = this;
    $.post('/api/utility/preview', {"body": self.$('#form-lesson-body').val()}, function (data) {
      self.$('#edit-lesson-form').hide();
      self.$('#lesson-space').append(self.previewTemplate());
      self.$('#lesson-preview').html(data.body_markdown);
    }).fail(function () { router.rout('/error'); });
  },

  edit: function () {
    this.$('#preview-container').remove();
    this.$('#edit-lesson-form').show();
  }
});
