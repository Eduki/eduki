/* This view encapsulates logic for the navbar partial
 *
 * David Mah
 */
Eduki.Views.Navbar = Backbone.View.extend({
  template: JST['partials/navbar'],
  events: {
    'click #navbar-logout': 'logout'
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  logout: function() {
    currentUser.flush_credentials();
    router.redirect("/");
  }
});
