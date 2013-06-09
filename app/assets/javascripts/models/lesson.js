/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false, */
'use strict';

/*
 * Lesson model
 */

Eduki.Models.Lesson = Backbone.Model.extend({
  urlRoot: function () {
    return '/api/courses/' + this.get('course_id') + '/lessons/';
  },

  deleteUrl: function () { return '/api/lessons/' + this.get('id'); },

  sync: function (method, model, options) {
    if (method === 'delete') {
      options.url = model.deleteUrl();
    }
    return Backbone.sync.apply(this, arguments);
  },

  validate : function (attrs, options) {
    var errorMsg;
    if (!attrs.title) {
      errorMsg = ['form-lesson-title', 'Please provide a title'];
    } else if (!attrs.body) {
      errorMsg = ['form-lesson-body', 'Please provide lesson content'];
    }
    return errorMsg;
  }
});
