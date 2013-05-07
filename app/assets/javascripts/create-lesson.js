$(document).ready(function() {
	$('#create-lesson-button button').click(createLesson);
});

// Lesson model definition
var Lesson = Backbone.Model.extend({
	urlRoot: function() {
    return '/api/courses/' + this.get('course_id') + '/lessons'
  },

	defaults: {
		id: null,
		title: '',
		body: '',
		course_id: 1
	},

  // Checks if a Lesson has valid content to send
	validate : function (attrs, options) {
		if (attrs.title == '' || attrs.body == '') {
      displayCreationError();
			return 'Course info not properly filled out';
		}
	}
});

// Grab form contents, create lesson, send to database
function createLesson(event) {
  $('#create-lesson-failure').remove();
	var lesson = new Lesson({title: $('#create-lesson-name').val(),
                           body: $('#create-lesson-content').val()});
	lesson.save({}, {
     success: function() {
       displayCreationSuccess(lesson);
     },
     error: function() {
       displayCreationError();
     }
 });
}

// Display a success message
function displayCreationSuccess(lesson) {
  $('#create-lesson-button').remove();

  var successContainer = $('<div></div>');
  successContainer.attr('id', 'create-lesson-success');

  var successMessageContainer = $('<div></div>');
  successMessageContainer.attr('id', 'create-lesson-success-message');
  successMessageContainer.addClass('feedback-message row');

  var successMessage = $('<p></p>');
  successMessage.addClass('span8 offset2');
  successMessage.html('Lesson successfully created.' + 'The course ID is: <strong>' +
                      lesson.get('course_id') + '</strong> and the lesson ID is: <strong>' +
                      lesson.get('id') + '</strong>');


  var row = $('<div></div>');
  row.addClass('row');

  var newLessonButton = $('<button></button>');
  newLessonButton.attr('id', 'new-lesson-button');
  newLessonButton.addClass('span8 offset2 btn btn-large btn-success');
  newLessonButton.on('click', function() { window.location.href = '/create_lesson'; });
  newLessonButton.html('Create Another Lesson');

  successMessageContainer.append(successMessage);
  successContainer.append(successMessageContainer);
  successContainer.append(newLessonButton);

  $('#container').append(successContainer);
}

// Display a failure message
function displayCreationError() {
	var failureContainer = $('<div></div>');
	failureContainer.attr('id', 'create-lesson-failure');
	failureContainer.addClass('feedback-message row');

	var failureMessage = $('<p></p>');
	failureMessage.addClass('span8 offset2');
	failureMessage.text('Lesson failed to create. Please enter valid information.')
	failureContainer.append(failureMessage);

	$('#create-lesson-form').after(failureContainer);
}
