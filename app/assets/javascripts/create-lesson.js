$(document).ready(function() {
	$("#les_button").click(makeAndSend);
	var ajax = new XMLHttpRequest();
	ajax.onload = fn;
	ajax.onerror = errorFunction;
	ajax.open("GET", "http://eduki.herokuapp.com/api/courses/1/lessons", true);
	ajax.send();
});

var newLesson = Backbone.Model.extend({
	urlRoot: 'http://eduki.herokuapp.com/api/courses/1/lessons',

	defaults: {
		title: 'helo',
		body: 'whhfdkslsk'
	}
});

function makeAndSend(event) {
	var course = new newLesson({name: $('#create-lesson-name').val(), content: $('#create-lesson-content').val()});
	course.save({}, {              // generate POST /users - content: {name: 'John'}
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
}