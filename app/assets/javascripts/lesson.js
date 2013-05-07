$(document).ready(function() {
  // Get a Lesson based on Course and Lesson ID
  $('#lesson-form').submit(function(e) {
    $('#invalid-lesson-message').remove(); // Remove the error message if it exists

    // Create a parameters for a lesson to fetch
    var lesson = new Lesson();
    lesson.set('id', $('#lesson-id').val());
    lesson.set('course_id', $('#course-id').val());

    // Fetch lesson
    lesson.fetch({
      success: function() {
        displayLessonView(lesson);
      },
      error: function() {
        displayInvalidLessonMessage();
      }
    });
    e.preventDefault(); // Prevents form from submitting
  });
});

// Lesson model
var Lesson = Backbone.Model.extend({
  // URL for fetching courses and lessons
  url: function() {
    return '/api/courses/' + this.get('course_id') + '/lessons/' + this.get('id')
  }
});

// Generate the the HTML content for a lesson
function displayLessonView(lesson) {
  if (!lesson.get('title') || !lesson.get('body')) {
    displayInvalidLessonMessage();
    return;  
  }

  $('#lesson-form').css('display', 'none');
  
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

  var viewAnotherBtn = $('<button></button>');
  viewAnotherBtn.addClass('btn btn-primary')
  viewAnotherBtn.html('View Another Lesson')
  viewAnotherBtn.click(function() { displayFormView(); });
  containerDiv.append(viewAnotherBtn);

  lessonDiv.append(containerDiv);
  $('#container').append(lessonDiv);
}

// Make form appear again and remove error message if exists
function displayFormView() {
  $('.lesson').remove();
  $('#lesson-form').css('display', 'block');
}

// Generate a message for a lesson/course combo that doesn't exist
function displayInvalidLessonMessage() {
  var invalidLessonMessage = $('<p></p>');
  invalidLessonMessage.attr('id', 'invalid-lesson-message');
  invalidLessonMessage.html('Sorry, that lesson does not exist!');
  invalidLessonMessage.css({'color': 'red', 'font-size': '18pt'});
  $('#lesson-form div').append(invalidLessonMessage);
}
