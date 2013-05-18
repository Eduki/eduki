// A class to wrap routing for the entire application
Eduki.Routers.Eduki = Backbone.Router.extend({
  routers: [],
  initialize: function() {
    this.routers.push(new Eduki.Routers.Courses());
    this.routers.push(new Eduki.Routers.Lessons());
    this.routers.push(new Eduki.Routers.Quizzes());
    this.routers.push(new Eduki.Routers.Static());
    this.routers.push(new Eduki.Routers.Users());
  },

  // Redirects the user to another route.
  route: function(url) {
    Backbone.history.navigate(url, true)
  }
});
