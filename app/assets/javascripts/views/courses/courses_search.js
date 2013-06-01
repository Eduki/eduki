/*
 * View for search
 *
 * author: David Mah
 */
Eduki.Views.CoursesSearch = Backbone.View.extend({
  template: JST['courses/search'],
  resultsTemplate: JST['courses/index'],
  errorTemplate: JST['static/error'],

  events: {
    'submit form'  : 'search',
    'click button' : 'search'
  },

  initialize: function() {
    this.render(this.template());
  },

  render: function(template) {
    $(this.el).html(template);
    return this;
  },

  // A search is really a redirection to course index with a query in the
  // request parameters
  search: function(event) {
    event.preventDefault();
    query = {query: this.$el.find("#search-query").val()}
    router.route("/courses", query);
  },
});
