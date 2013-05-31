/*
 * An overall view of a course and its lessons/quizzes
 *
 * author: Jolie Chen
 */
Eduki.Views.CoursesOverview = Backbone.View.extend({

  template: JST['courses/overview'],
  errorTemplate: JST['static/error'],
  events: {
    'click #enroll': 'enroll',
    'click #enrolled': 'unenroll'
  },

  initialize: function() {
    // Only check for enrollments if a user is logged in
    var self = this;
    this.course = new Eduki.Models.Course({id: this.attributes.course_id});
    this.course.fetch({
      success: function() {self.renderOverview();},
      failure: function() {self.render(self.errorTemplate());}
    });

  },

  renderOverview: function() {
    console.log(this.course);
    this.quizzes = new Eduki.Collections.Quizzes({course_id: this.course.get('id')});
    this.lessons = new Eduki.Collections.Lessons({course_id: this.course.get('id')});

    // Fetch course and all its lessons. Once retrieved, execute
    // render through the callback to display them.
    var self = this;
    $.when(this.quizzes.fetch(),
           this.lessons.fetch()).then(
             function() {self.render(self.template());
                         self.getEnrollments();},
             function() {self.render(self.errorTemplate());}
           );
  },

  // Renders a course's lesson
  render: function(template) {
    $(this.el).html(template);
    return this;
  },

  getEnrollments: function() {
    if (currentUser.authenticated) {
      var self = this;
      this.enrollments = new Eduki.Collections.Enrollments({user_id: currentUser.id});
      this.enrollments.fetch({
        success: function() {self.setEnrolled();},
        error: function() {self.render(self.errorTemplate());}
      });
    }
  },

  // Indicates user is enrolled
  setEnrolled: function() {
    // See if a user is enrolled in this particular course
    this.enrollment = this.enrollments.findWhere({course_id: parseInt(this.course.get('id'))});
    if (this.enrollment) {
      this.$('#enroll').attr('id', 'enrolled');
    }
  },

  // Enrolls a user in this course
  enroll: function() {
    if (!this.enrollment && currentUser.authenticated) {
      this.enrollment = new Eduki.Models.Enrollment({user_id: currentUser.id,
                                                     course_id: this.course.get('id')});
      this.enrollment.save({}, {wait:true});
      this.$('#enroll').attr('id', 'enrolled');
    }
  },

  // Unenrolls a user
  unenroll: function() {
    var self = this;
    this.enrollment.destroy({
      success: function() {
        self.$('#enrolled').attr('id', 'enroll');
        self.enrollment = undefined;
      },
      error: function() {self.render(self.errorTemplate());}
    });
  },
});
