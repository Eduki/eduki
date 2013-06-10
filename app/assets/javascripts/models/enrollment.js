/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false, */
'use strict';

/*
 * Enrollment model
 *
 * author: Jolie Chen
*/

Eduki.Models.Enrollment = Backbone.Model.extend({
  url: function () {
    var url;
    // returns the appropriate url for the application of the quiz
    if (this.get('user_id')) {
      url = '/api/users/' + this.get('user_id') + '/enrollments';
    } else {
      url = '/api/enrollments/' + this.get('id');
    }
    return url;
  },

  deleteUrl: function () { return '/api/enrollments/' + this.get('id'); },

  sync: function (method, model, options) {
    if (method === 'delete') {
      options.url = model.deleteUrl();
    }
    return Backbone.sync.apply(this, arguments);
  },
});
