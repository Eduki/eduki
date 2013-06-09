/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false,
  JST: false, router: false */
'use strict';

Eduki.Views.CoursesIndex = Backbone.View.extend({

  template: JST['courses/index'],
  errorTemplate: JST['static/error'],

  events: {
    'submit form'  : 'search',
    'click button' : 'search',
    'click input' : 'hideInvalid'
  },

  // Fetch all courses. Once retrieved, execute
  // render through the callback to display them.
  initialize: function (query) {
    this.courses = new Eduki.Collections.Courses();
    var self = this;
    var retrievalFunction = this.courses.fetch;
    var courses = this.courses;

    // If there is a search query param, use that
    if (query !== undefined) {
      retrievalFunction = function () { return courses.search(query); };
    } else {
      retrievalFunction = function () { return courses.fetch(); };
    }

    $.when(retrievalFunction()).then(
      function () { self.render(self.template()); },
      function () { self.render(self.errorTemplate()); }
    );
  },

  // Renders the course
  render: function (template) {
    $(this.el).html(template);
    return this;
  },

  search: function (event) {
    event.preventDefault();
    if (this.$el.find("#search-query").val()) {
      var query = {query: this.$el.find("#search-query").val()};
      router.route("/courses", query);
    } else {
      this.showInvalid("search-query", "Please provide a query");
    }
  },

  // Show an error message
  showInvalid: function (input, message) {
    this.$('#' + input).attr('data-content', message);
    this.$('#' + input).popover('show');
  },

  // Hide validation error when input is clicked upon
  hideInvalid: function () {
    this.$('input').popover('hide');
    this.$('textarea').popover('hide');
  },
});
