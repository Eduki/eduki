$(document).ready(function() {
  /*
  var LessonView = Backbone.View.extend({
    tagName: 'div',
    className: 'row lesson',
    id: 'lesson-' + lesson.get('title'),
    template: _.template($('#lessonTemplate').html(), {}),

    render: function() {
      this.$el.append(this.template);
    }

  });
  */

  $('#get-lesson-button').on('click', generateLessonView);
});

var Lesson = Backbone.Model.extend({
  defaults: {
    id: 0,
    title: 'Biology Lesson',
    body: 'Herpaderpderpp\n nerrrp'
  },
  urlRoot: '/api/courses/1/lessons/'
});

/*
var Lessons = Backbone.Collection.extend([], {
  model: Lesson,
  url: 'http://eduki.herokuapp.com/api/courses/1/lessons/',
});
*/

var lesson = new Lesson();

function generateLessonView() {
  console.log(lesson.fetch());

  var lessonDiv = $('<div></div>');
  lessonDiv.attr('id', ('lesson-' + lesson.get('id')));
  lessonDiv.addClass('row lesson');

  var containerDiv= $('<div></div>');
  containerDiv.addClass('span8 offset2');

  var lessonHeader = $('<h1></h1>');
  lessonHeader.html(lesson.get('title'));
  containerDiv.append(lessonHeader);

  var paragraphs = lesson.get('body').split('\n');
  for (var i = 0; i < paragraphs.length; i++) {
    containerDiv.append('<p>' + paragraphs[i] + '<p>');
  }

  lessonDiv.append(containerDiv);
  $('.container').html(lessonDiv);

}
