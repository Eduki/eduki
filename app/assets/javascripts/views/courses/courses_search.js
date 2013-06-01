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
    'click button' : 'search',
    'click input' : 'hideInvalid'
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
    if (this.$el.find("#search-query").val()) {
      query = {query: this.$el.find("#search-query").val()}
      router.route("/courses", query);
    } else {
      this.showInvalid("search-query", "Please provide a query");
    }
  },

  // Show an error message
  showInvalid: function(input, message) {
      this.$('#' + input).attr('data-content', message);
      this.$('#' + input).popover('show');
  },

  // Hide validation error when input is clicked upon
  hideInvalid: function() {
    this.$('input').popover('hide');
    this.$('textarea').popover('hide');
  },
});
