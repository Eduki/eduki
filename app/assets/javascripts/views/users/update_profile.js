Eduki.Views.UpdateProfile = Backbone.View.extend({

  template: JST['users/update'],
  errorTemplate: JST['static/error'],

  events: {
    'click button' : 'update'
  },

  initialize: function() {
    // Fetch all courses. Once retrieved, execute
    // render through the callback to display them.
    this.render(this.template());
    this.fetchUserInfo();
  },

  fetchUserInfo: function() {
    this.user = new Eduki.Models.User({ id: currentUser.id });

    var self = this;
        // Get enrollments from database
    this.user.fetch({
      success: function() {
        self.updateFields();
      },
      error: function(model, xhr, options) {
        self.render(self.errorTemplate());
      }
    });
  },

  updateFields: function() {
    
  },

  // Renders the template only if user is logged in
  // otherwise, routes them to the login page
  render: function(template) {
    if (currentUser.authenticated) {
      $(this.el).html(template);
      return this;
    } else {
      router.route("/login");
      return false;
    }
  },

  update: function(e) {
    e.preventDefault();
    console.log(currentUser.id);
    alert('put this shit');
  }
});