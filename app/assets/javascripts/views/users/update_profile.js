Eduki.Views.UpdateProfile = Backbone.View.extend({

  template: JST['users/update'],
  errorTemplate: JST['static/error'],
  successTemplate: JST['users/update_success'],

  events: {
    'submit form' : 'update'
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


  // COMMMENT FOR CR.
  // would it be better to put this in the template? or leave it here?
  updateFields: function() {
    this.$('#first-name').val(this.user.attributes.first_name);
    this.$('#last-name').val(this.user.attributes.last_name);
    this.$('#email').val(this.user.attributes.email);
    this.$('#background').val(this.user.attributes.background);
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
    this.user = new Eduki.Models.User({ id: currentUser.id,
                                        first_name: this.$('#first-name').val(),
                                        last_name: this.$('#last-name').val(),
                                        email: this.$('#email').val(),
                                        background: this.$('#background').val() });
    
    var self = this;
    this.user.save({id: this.user.get('id')},
                     {wait: true,
                      success: function() { self.render(self.successTemplate()); },
                      error: function() { self.render(self.errorTemplate()); }});
  }
});