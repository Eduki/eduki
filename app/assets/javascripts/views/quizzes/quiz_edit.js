/* JSLint Arguments */
/*jslint indent: 2*/
/*jslint browser: true*/
/*jslint vars: true*/
/*jslint regexp: true*/
/*global Eduki: false, Backbone: false, $: false, jQuery: false, currentUser: false,
  JST: false, router: false */
'use strict';

/*
 * Handles rendering a view for editing a quiz
 *
 * author: Micheal Abboud
*/

Eduki.Views.QuizEdit = Backbone.View.extend({
  className: 'container',
  template: JST['quizzes/edit'],
  problemTemplate: JST['quizzes/problem'],

  events: {
    'click #create-quiz-add' : 'add',
    'click .create-quiz-delete' : 'deleteProblem',
    'click #update': 'validateQuiz',
    'click #create-quiz-title': 'hideInvalid',
    'click .create-quiz-question': 'hideInvalid',
  },

  initialize: function () {
    // Initialize models
    this.course = new Eduki.Models.Course({id: this.attributes.course_id});
    this.quiz = new Eduki.Models.Quiz({id: this.attributes.quiz_id});
    this.enrollments = new Eduki.Collections.Enrollments({user_id: currentUser.id});

    this.answerArray = {
      "A" : 0,
      "B" : 1,
      "C" : 2,
      "D" : 3
    };

    this.count = 0;
  },

  // Renders an quiz unless user isn't logged in
  render: function () {
    this.fetchData();
    $(this.el).html(this.template());
    return this;
  },

  fetchData: function () {
    var self = this;
    $.when(this.course.fetch(),
           this.quiz.fetch(),
           this.enrollments.fetch()).then(
      function () {
        self.updateFields();
      },
      function () { router.route('/error'); }
    );
  },

  updateFields: function () {
    this.$('#create-quiz-title').val(this.quiz.get('title'));
    var i;
    for (i = 0; i < this.quiz.get('problems').length; i +=  1) {
      var problem = this.quiz.get('problems')[i];
      this.add();
      this.$('#problem-' + i).val(problem.question);
      this.$('input:radio[name=problem-' + i + ']:nth(' + this.answerArray[problem.answer] + ')').attr('checked', true);
    }
  },

  // adds a problem to the form
  add: function () {
    this.$('#create-quiz-problems').append(this.problemTemplate());
    this.count += 1;
  },

  // Deletes a problem from the form.
  deleteProblem: function (e) {
    if (this.$('.create-quiz-problem').length > 1) {
      this.$(e.target).parent().remove();
    } else {
      // A quiz ust always have at least one problem
      this.showInvalid('.create-quiz-delete', 'A quiz must have at least one problem');
      this.$('.create-quiz-delete').siblings('.popover').delay(2000).fadeOut();
    }
  },

  // Validate all fields are passed before submitting
  validateQuiz: function (e) {
    this.$('.popover').remove();
    e.preventDefault();

    // Do not allow empty quiz title
    if (!this.$('#create-quiz-title').val()) {
      this.showInvalid(this.$('form .control-label').first(), 'Please provide a title');
    }

    var submittedProblems = this.$('.create-quiz-problem');
    var problems = []; // Array for database submission
    var i;
    for (i = 0; i < submittedProblems.length; i += 1) {
      var questionLabel = $(submittedProblems[i]).find('.control-label').first();
      var question = $(submittedProblems[i]).find('textarea');
      var answer = this.$('input[name=' + $(question).attr('id') + ']:checked', '#quiz');

      // Questions must have a problem and correct answer
      if (!(question.val() && answer.val())) {
        this.showInvalid(questionLabel, 'Please provide a question and correct answer');
      } else {
        var problem = {
          question: question.val(),

          // the name being the submitted problems id is to handle the case where
          // a user is creating a quiz and deletes problems that are in the middle
          // by associating each question with its own 'problem-i' id, which corresponds
          // a set of radio buttons for that question, it lets everything stay grouped
          answer: answer.val()
        };
        problems.push(problem);
      }
    }

    // Submit the quiz if all the data is valid
    if (this.$('#create-quiz-title').val() &&
        (submittedProblems.length === problems.length)) {
      this.update(problems);
    } else {
      this.showInvalid(this.$('#update'), "There are errors with your quiz");
      this.$('#update').siblings('.popover').delay(2000).fadeOut();
    }
  },

  update: function (problems) {
    this.quiz = new Eduki.Models.Quiz({ id: this.quiz.get('id'),
                                        course_id: this.attributes.course_id,
                                        title: $('#create-quiz-title').val(),
                                        problems: problems});
    // Save quiz to database
    var self = this;
    $.when(this.quiz.save()).then(
      function () { router.route('/courses/' + self.quiz.get('course_id') +
                    '/quizzes/' + self.quiz.get('id')); },
      function () { router.route('/error'); }
    );
  },

  // Show an invalid message on error
  showInvalid: function (input, message) {
    this.$(input).attr('data-content', message);
    this.$(input).popover('show');
  },

  // Hide validation error when input is clicked upon
  hideInvalid: function (e) {
    this.$(e.target).parent().siblings().popover('hide');
  },
});
