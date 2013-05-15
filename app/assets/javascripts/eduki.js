window.Eduki = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Eduki.Routers.Courses();
    new Eduki.Routers.Lessons();
    new Eduki.Routers.Signup();
    new Eduki.Routers.Static();
    Backbone.history.start()
  }
};

$(document).ready(function(){
  Eduki.initialize();
});
