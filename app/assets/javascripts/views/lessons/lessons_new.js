Eduki.Views.LessonsCreate = Backbone.View.extend({

	template: JST['lessons/new'],
  errorTemplate: JST['static/error'],
  createdTemplate: JST['lessons/created'],

  events: {
    'submit form' : "create"
  },

  initialize: function() {
    this.render(this.template());
    this.cid = this.attributes.course_id;
  },

  // Renders the create lesson form
  render: function(template) {
    $(this.el).html(template);
    return this;
  },

  create: function(e) {
    e.preventDefault();
    this.lesson = new Eduki.Models.Lesson({ title: $('#create-lesson-name').val(), 
                                            body: $('#create-lesson-content').val(),
                                             course_id: this.cid });
    var self = this;
    $.when(this.lesson.save()).then(
            function() { self.render(self.createdTemplate()); },
            function() { self.render(self.errorTemplate()); }
          );
  }
});