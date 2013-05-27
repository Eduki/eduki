// A class to wrap routing for the entire application
// It is meant to be used as a singleton that can be referenced by the world
// variable **router**.
//
// From anywhere in the application, call router.route(_path_) to redirect the user
// to another route.
//
// David Mah
Eduki.Routers.Eduki = Backbone.Router.extend({
  masterView: undefined,
  routers: [],
  initialize: function() {
    // Render Master View regardless of the URL
    this.renderMasterView();
    this.routers.push(new Eduki.Routers.Courses());
    this.routers.push(new Eduki.Routers.Lessons());
    this.routers.push(new Eduki.Routers.Quizzes());
    this.routers.push(new Eduki.Routers.Static());
    this.routers.push(new Eduki.Routers.Users());
  },

  // Redirects the user to another route.
  route: function(url) {
    Backbone.history.navigate(url, true)
  },

  // Redirects the user to another route, refreshing the application
  redirect: function(url) {
    window.location.replace(url);
  },

  // This rendering happens on every page, displaying page features that
  // are common to every page
  renderMasterView: function() {
    this.masterView = new Eduki.Views.Master();
    $('body').html(this.masterView.render().el);
  }
});
