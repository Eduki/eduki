/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false,
  JST: false, router: false */
'use strict';

/*
 * Handles editing page for courses
 *
 * author: Michael
 */

Eduki.Views.CoursesEdit = Backbone.View.extend({
  className: 'container',

  template: JST['courses/edit'],
  errorTemplate: JST['static/error'],

  events: {
    'click button' : 'update',
    'click input' : 'hideInvalid',
    'keyup textarea' : 'updateRemaining'
  },

  initialize: function () {
    this.course = new Eduki.Models.Course({ id: this.attributes.course_id });
  },

  // grabs current course info from database and displays in the form
  // if it exists
  fetchCourseInfo: function () {
    var self = this;
    this.course.fetch({
      success: function () { self.updateFields(); },
      error: function () { router.route('/error'); }
    });
  },

  // begins the work to render the template only if user is logged in
  // otherwise, routes them to the login page
  render: function () {
    var self;
    if (currentUser.authenticated) {
      this.fetchCourseInfo();
      self = this;
    } else {
      router.route('/');
      self = false;
    }
    return self;
  },

  // will throw up the html+css and fill in the form with the course info that is already there
  updateFields: function () {
    $(this.el).html(this.template());
    this.$('#form-course-title').val(this.course.get('title'));
    this.$('#form-course-description').val(this.course.get('description'));
    this.updateRemaining();
  },

  update: function () {
    this.course = new Eduki.Models.Course({ id: this.course.get('id'),
                                            title: this.$('#form-course-title').val(),
                                            description: this.$('#form-course-description').val() });

    // updates course info
    // routes to dashboard on success
    // renders error page on error
    var self = this;
    if (this.course.isValid()) {
      this.course.save({id: this.course.get('id')},
                     {wait: true,
                      success: function () { router.route('/courses/' + self.course.get('id')); },
                      error: function () { router.route('/error'); }});
    } else {
      this.showInvalid(this.course.validationError[0],
                       this.course.validationError[1]);
    }
  },

  // Hide validation error when input is clicked upon
  hideInvalid: function () {
    this.$('input').popover('hide');
  },

  // Make the popoever appear with an error message
  showInvalid: function (input, message) {
    this.$('#' + input).attr('data-content', message);
    this.$('#' + input).popover('show');
  },

  updateRemaining: function () {
    this.$('#remaining').html(500 - this.$('#form-course-description').val().length);
  },
});
