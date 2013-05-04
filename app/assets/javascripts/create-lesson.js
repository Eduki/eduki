$(document).ready(function() {
	$("#les_button").click(makeAndSend);
<<<<<<< HEAD
/*	var ajax = new XMLHttpRequest();
	ajax.onload = fn;
	ajax.onerror = errorFunction;
	ajax.open("GET", "http://eduki.herokuapp.com/api/courses/1/lessons", true);
	ajax.send();*/
});

var newLesson = Backbone.Model.extend({
	urlRoot: '/api/courses/1/lessons',

	defaults: {
		id: null,
		title: 'helo',
		body: 'whhfdkslsk'
=======
});

var newLesson = Backbone.Model.extend({
	urlRoot: '/courses',

	defaults: {
		name: 'helo',
		content: 'whhfdkslsk'
>>>>>>> feaf5b2771ff50060a5b3fc0330796f62de5e4aa
	}
});

function makeAndSend(event) {
<<<<<<< HEAD
	var course = new newLesson({title: $('#create-lesson-name').val(), 
															body: $('#create-lesson-content').val()});
	course.save({}, {
     success: function() {
     		alert('course saved successfully');
     },

     error: function() {
     		alert('course failed');
     }
 });
}

function fn(e) {
  if (this.status == 200) {   // 200 means request succeeded
    console.log(this.responseText);
  } else {
    console.log('error');
  }
}

function errorFunction(e) {
	console.log('error');
=======
	var course = new newLesson({name: $('#create-lesson-name').val(), content: $('#create-lesson-content').val()});
	alert('course name: ' + course.get('name') + ',\ncourse content: ' + course.get('content'));
>>>>>>> feaf5b2771ff50060a5b3fc0330796f62de5e4aa
}