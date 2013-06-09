/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*global Eduki: false, Backbone: false, $: false */
'use strict';

Eduki.Routers.Users = Backbone.Router.extend({
  routes: {
    'dashboard(/)': 'dashboard',
    'user/update(/)': 'update',
    'user/premium(/)': 'premium',
    'user/enrollment/:eid/quizzes(/)': 'quizzes',
  },

  dashboard: function () {
    var view = new Eduki.Views.Dashboard();
    $('#main-content').html(view.render().el);
  },

  update: function () {
    var view = new Eduki.Views.UpdateProfile();
    $('#main-content').html(view.render().el);
  },

  premium: function () {
    var view = new Eduki.Views.Premium();
    $('#main-content').html(view.render().el);
  },

  quizzes: function (eid) {
    var view = new Eduki.Views.QuizAttempts({attributes: {enrollment_id: eid}});
    $('#main-content').html(view.render().el);
  }
});
