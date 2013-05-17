window.Eduki = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Eduki.Routers.Courses();
    new Eduki.Routers.Lessons();
    new Eduki.Routers.Static();
    new Eduki.Routers.Quizzes();
    Backbone.history.start()
  }
};

$(document).ready(function(){
  Eduki.initialize();
});
