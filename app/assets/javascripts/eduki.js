window.Eduki = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    currentUser = Eduki.Models.CurrentUser.create_from_cookie();
    router = new Eduki.Routers.Eduki();
    Backbone.history.start()
  }
};

$(document).ready(function(){
  Eduki.initialize();
});
