/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*global Eduki: false, Backbone: false */
'use strict';

/*
 * Quiz model
 */

Eduki.Models.Quiz = Backbone.Model.extend({

  url: function () {
    var url;
    // returns the appropriate url for the application of the quiz
    if (!this.get('id')) {
      url = '/api/courses/' + this.get('course_id') + '/quizzes';
    } else {
      url = '/api/quizzes/' + this.get('id');
    }
    return url;
  }
});
