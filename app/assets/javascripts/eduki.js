window.Eduki = {
  Assets: {},
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    currentUser = Eduki.Models.CurrentUser.createFromCookie();
    router = new Eduki.Routers.Eduki();
    Backbone.history.start();
    this.Assets = window.Assets;
  }
};

$(document).ready(function(){
  Eduki.initialize();
});
