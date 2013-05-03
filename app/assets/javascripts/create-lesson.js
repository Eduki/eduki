$(document).ready(function() {
	$("#les_button").click(makeAndSend);
});

var newLesson = Backbone.Model.extend({
	urlRoot: '/courses',

	defaults: {
		name: 'helo',
		content: 'whhfdkslsk'
	}
});

function makeAndSend(event) {
	var course = new newLesson({name: $('#create-lesson-name').val(), content: $('#create-lesson-content').val()});
	alert('course name: ' + course.get('name') + ',\ncourse content: ' + course.get('content'));
}