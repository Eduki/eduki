Eduki.Views.LessonsIndex = Backbone.View.extend({

  template: JST['lessons/index'],

  initialize: function() {
    // Fetch the course name
    this.course = new Eduki.Models.Course({id: this.attributes.course_id});
    this.course.on('sync', this.render, this);
    this.course.fetch();

    // Fetch all lessons. Once retrieved, execute
    // render through the callback to display them.
    this.lessons = new Eduki.Collections.Lessons(this.course.get('id'));
    this.lessons.url = '/api/courses/' + this.course.get('id') + '/lessons';
    this.lessons.on('sync', this.render, this);
    this.lessons.fetch();
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

});
