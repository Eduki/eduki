window.Eduki = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Eduki.Routers.Courses();
    new Eduki.Routers.Lessons();
    Backbone.history.start()
  }
};

$(document).ready(function(){
  Eduki.initialize();
});
