/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false,
  JST: false, router: false */
'use strict';

/*
 * Renders and controls course creation page
 *
 * author: Jolie
 */

Eduki.Views.CoursesNew = Backbone.View.extend({

  template: JST['courses/new'],
  errorTemplate: JST['static/error'],
  successTemplate: JST['courses/success'],

  events: {
    'click button' : 'create',
    'click textarea' : 'hideInvalid',
    'click input' : 'hideInvalid',
    'keyup textarea' : 'updateRemaining',
  },

  updateRemaining: function () {
    this.$('#remaining').html(500 - this.$('#form-course-description').val().length);
  },

  // Renders the template
  render: function () {
    $(this.el).html(this.template());
    return this;
  },

  create: function () {
    this.course = new Eduki.Models.Course({title: this.$('#form-course-title').val(),
                                           user_id: currentUser.id,
                                           description:  this.$('#form-course-description').val()});
    if (this.course.isValid()) {
      var self = this;
      this.course.save({title: this.course.get('title')},
                       {wait: true,
                        success: function () { router.route('/courses/' + self.course.get('id')); },
                        error: function () { router.route('/error') }});
    } else {
      this.showInvalid(this.course.validationError[0], this.course.validationError[1]);
    }
  },

  // Hide validation error when input is clicked upon
  hideInvalid: function () {
    this.$('input').popover('hide');
    this.$('textarea').popover('hide');
  },

  showInvalid: function (input, message) {
    this.$('#' + input).attr('data-content', message);
    this.$('#' + input).popover('show');
  },
});
