window.Eduki = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    current_user = Eduki.Models.CurrentUser.create_from_cookie();
    new Eduki.Routers.Courses();
    new Eduki.Routers.Lessons();
    new Eduki.Routers.Static();
    Backbone.history.start()
  }
};

$(document).ready(function(){
  Eduki.initialize();
});
