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
  // Params is a javascript object that will be encoded into
  // a querystring for the other route
  route: function(url, params) {
    params = this.encodeParamsAsQueryString(params);
    Backbone.history.navigate(url + params, true);
  },

  // Redirects the user to another route, refreshing the application
  // Params is a javascript object that will be encoded into
  // a querystring for the other route
  redirect: function(url, params) {
    params = this.encodeParamsAsQueryString(params);
    window.location.replace(url + params);
  },

  // This rendering happens on every page, displaying page features that
  // are common to every page
  renderMasterView: function() {
    this.masterView = new Eduki.Views.Master();
    this.footer = new Eduki.Views.Footer();
    $('body').html(this.masterView.render().el);
    $('body').append(this.footer.render().el);
  },

  // Params is a javascript object that will be encoded into a querystring
  encodeParamsAsQueryString: function(params) {
    return (params === undefined ? "" : "?" + jQuery.param(params));
  }
});
