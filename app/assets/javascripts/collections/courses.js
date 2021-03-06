/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false, */
'use strict';

/*
 * Course collection
 */
Eduki.Collections.Courses = Backbone.Collection.extend({
  initialize: function (options) {
    if (options) {
      this.user_id = options.user_id;
    }
  },
  model: Eduki.Models.Course,
  url: function () {
    var url;
    if (this.user_id) {
      url = '/api/users/' + this.user_id + '/courses';
    } else {
      url = '/api/courses';
    }
    return url;
  },

  search: function (query) {
    return this.fetch({data: query});
  }
});
