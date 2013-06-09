/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false,
  JST: false, router: false */
'use strict';

/*
 * Renders and controls lesson creation page
 *
 * author: Michael
 */

Eduki.Views.LessonsCreate = Backbone.View.extend({

  template: JST['lessons/new'],
  errorTemplate: JST['static/error'],
  previewTemplate: JST['lessons/preview'],

  events: {
    'submit form' : 'create',
    'click #publish' : 'create',
    'click input' : 'hideInvalid',
    'click #preview' : 'preview',
    'click #edit' : 'edit'
  },

  initialize: function () {
    this.render(this.template());
    this.cid = this.attributes.course_id;
  },

  // Renders the create lesson form
  render: function (template) {
    $(this.el).html(template);
    return this;
  },

  // handles the form submission, displays appropriate pages on success/error
  create: function (e) {
    e.preventDefault();
    this.lesson = new Eduki.Models.Lesson({ title: this.$('#form-lesson-title').val(),
                                            body: this.$('#form-lesson-body').val(),
                                            course_id: this.cid });
    if (this.lesson.isValid()) {
      var self = this;
      $.when(this.lesson.save()).then(
        function () { router.route('/courses/' +
                                  self.lesson.get('course_id') +
                                  '/lessons/' +
                                  self.lesson.get('id')); },
        function () { self.render(self.errorTemplate()); }
      );
    } else {
      this.showInvalid(this.lesson.validationError[0], this.lesson.validationError[1]);
    }
  },

  // Show error message
  showInvalid: function (input, message) {
    this.$('#' + input).attr('data-content', message);
    this.$('#' + input).popover('show');
  },

  // Hide validation error when input is clicked upon
  hideInvalid: function () {
    this.$('input').popover('hide');
    this.$('textarea').popover('hide');
  },

  preview: function () {
    var self = this;
    $.post('/api/utility/preview', {"body": self.$('#form-lesson-body').val()}, function (data) {
      self.$('#create-lesson-form').hide();
      self.$('#lesson-space').append(self.previewTemplate());
      self.$('#lesson-preview').html(data.body_markdown);
    }).fail(function () { self.render(self.errorTemplate()); });
  },

  edit: function () {
    this.$('#preview-container').remove();
    this.$('#create-lesson-form').show();
  }
});
