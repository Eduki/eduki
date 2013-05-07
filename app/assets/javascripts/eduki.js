window.Eduki = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Eduki.Routers.Courses();
    Backbone.history.start()
  }
};

$(document).ready(function(){
  Eduki.initialize();
});
