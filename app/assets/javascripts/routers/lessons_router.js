/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false, */
'use strict';

/*
 * Handles routing for lesson related pages
 * delegates rendering to each view
 *
 * author: Michael
 */

Eduki.Routers.Lessons = Backbone.Router.extend({
  routes: {
    'courses/:cid/lessons/new(/)': 'create',
    'courses/:cid/lessons/:id(/)': 'lesson',
    'courses/:cid/lessons/:id/edit(/)': 'edit'
  },

  // Delegate to the Lesson View and render it inside of the container
  lesson: function (cid, id) {
    var view = new Eduki.Views.LessonsLesson({attributes: {course_id: cid, lesson_id: id}});
    $('#main-content').html(view.render().el);
  },

  // Delegate to the Lesson Creation page and render the form inside the container
  create: function (cid) {
    var view = new Eduki.Views.LessonsCreate({attributes: {course_id: cid}});
    $('#main-content').html(view.render().el);
  },

  edit: function (cid, id) {
    var view = new Eduki.Views.LessonsEdit({attributes: {course_id: cid, lesson_id: id}});
    $('#main-content').html(view.render().el);
  }

});
