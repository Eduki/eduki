Eduki.Views.CoursesOverview = Backbone.View.extend({

  template: JST['courses/overview'],
  errorTemplate: JST['static/error'],
  events: {
    'click #enroll': 'enroll'
  },

  initialize: function() {
    this.isEnrolled();
    this.course = new Eduki.Models.Course({id: this.attributes.course_id});
    this.quizzes = new Eduki.Collections.Quizzes();
    this.quizzes.url = '/api/courses/' + this.course.get('id') + '/quizzes';
    this.lessons = new Eduki.Collections.Lessons(this.course.get('id'));
    this.lessons.url = '/api/courses/' + this.course.get('id') + '/lessons';

    // Fetch course and all its lessons. Once retrieved, execute
    // render through the callback to display them.
    var self = this;
    $.when(this.course.fetch(),
           this.quizzes.fetch(),
           this.lessons.fetch()).then(
             function() { self.render(self.template()); },
             function() { self.render(self.errorTemplate()); }
           );
  },

  // Renders a course's lesson
  render: function(template) {
    $(this.el).html(template);
    return this;
  },

  enroll: function() {
    console.log('click');
    if (!this.enrolled) {
      this.enrollment = new Eduki.Models.Enrollment({user_id: currentUser.id, course_id: this.course.get('id')});
      this.enrollment.save({}, {wait:true});
      this.$('#enroll span').html('enrolled');
      this.$('#enroll').addClass('clicked-button')
    }
  },

  isEnrolled: function() {
    this.enrollments = new Eduki.Collections.Enrollments({user_id: currentUser.id});
    var self = this;
    $.when(this.enrollments.fetch()).then(
      function() { self.enrolled = self.enrollments.findWhere({course_id: parseInt(self.course.get('id'))}); },
      function() { self.render(self.errorTemplate()); }
    );
  },
});
