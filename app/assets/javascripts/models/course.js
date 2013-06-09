/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false, */
'use strict';

Eduki.Models.Course = Backbone.Model.extend({
  urlRoot: '/api/courses/',
  createUrl: function () { return '/api/users/' + this.get('user_id') + '/courses/'; },

  sync: function (method, model, options) {
    if (method === 'create') {
      options.url = model.createUrl();
    }
    return Backbone.sync.apply(this, arguments);
  },

  validate : function (attrs, options) {
    var errorMsg;
    if (!attrs.title) {
      errorMsg = ['form-course-title', 'Please provide a title'];
    } else if (!attrs.description || attrs.description.length > 500) {
      errorMsg = ['form-course-description', 'Please provide a valid description'];
    }

    return errorMsg;
  }
});
