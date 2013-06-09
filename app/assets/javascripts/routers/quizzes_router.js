/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*global Eduki: false, Backbone: false, $: false */
'use strict';

/*
 * Handles routing for quiz related pages
 * delegates rendering to each view
 *
 * author: Michael, Jolie
 */

Eduki.Routers.Quizzes = Backbone.Router.extend({
  routes: {
    'courses/:cid/quizzes/new(/)': 'create',
    'courses/:cid/quizzes/:id(/)': 'quiz',
    'courses/:cid/quizzes/:id/edit(/)': 'edit'
  },

  // Delegate to the Quiz Creation page and render the form inside the container
  create: function (cid) {
    var view = new Eduki.Views.QuizNew({attributes: {course_id: cid}});
    $('#main-content').html(view.render().el);
  },

  // Delegate to the Quiz View and render it inside of the container
  quiz: function (cid, id) {
    var view = new Eduki.Views.QuizShow({attributes: {course_id: cid, quiz_id: id}});
    $('#main-content').html(view.render().el);
  },

  edit: function (cid, id) {
    var view = new Eduki.Views.QuizEdit({attributes: {course_id: cid, quiz_id: id}});
    $('#main-content').html(view.render().el);
  }
});

