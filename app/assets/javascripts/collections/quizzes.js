/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false, */
'use strict';

/*
 * Quiz collection
 */
Eduki.Collections.Quizzes = Backbone.Collection.extend({
  initialize: function (options) {
    if (options) {
      this.course_id = options.course_id;
    }
  },
  model: Eduki.Models.Quiz,
  url: function () { return '/api/courses/' + this.course_id + '/quizzes'; }
});

