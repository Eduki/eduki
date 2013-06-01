window.Eduki = {
  Assets: {},
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.Assets = window.Assets;
    currentUser = Eduki.Models.CurrentUser.createFromCookie();
    router = new Eduki.Routers.Eduki();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Eduki.initialize();
});
