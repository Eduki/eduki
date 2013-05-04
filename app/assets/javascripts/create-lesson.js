$(document).ready(function() {
	$("#les_button").click(makeAndSend);
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
		title: '',
		body: '',
		course_id: 1
	},

	validate : function (attrs, options) {
		if (attrs.title == '' || attrs.body == '') {
			alert('Course info not filled in correctly. Please resubmit with correct info');
			return 'Course info not properly filled out';
		}
	}
});

function makeAndSend(event) {
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
}