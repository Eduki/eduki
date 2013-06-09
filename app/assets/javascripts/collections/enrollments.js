/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false, */
'use strict';

/*
 * Enrollment collection
 */

Eduki.Collections.Enrollments = Backbone.Collection.extend({
  initialize: function (options) {
    this.user_id = options.user_id;
  },
  model: Eduki.Models.Enrollment,
  url: function () { return '/api/users/' + this.user_id + '/enrollments'; }
});
