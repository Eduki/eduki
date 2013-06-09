/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*global Eduki: false, Backbone: false */
'use strict';

/*
 * Quiz attempt collection
 */
Eduki.Collections.QuizAttempts = Backbone.Collection.extend({
  initialize: function (options) {
    if (options) {
      this.enrollment_id = options.enrollment_id;
    }
  },
  model: Eduki.Models.QuizAttempt,
  url: function () {
    var url;
    if (this.enrollment_id) {
      url = '/api/enrollments/' + this.enrollment_id + '/quiz_attempts';
    } else {
      url = 'api/quiz_attempts/' + this.get('id');
    }
    return url;
  }
});
