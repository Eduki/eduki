/* This view encapsulates logic for the logic partial
 *
 * author: Jolie Chen
 */
Eduki.Views.Footer = Backbone.View.extend({
  template: JST['partials/footer'],

  render: function() {
    $(this.el).html(this.template());
    return this;
  },
});

