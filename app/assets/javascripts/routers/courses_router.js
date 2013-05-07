Eduki.Routers.Courses = Backbone.Router.extend({
  routes: {
    '': 'index',
    'courses/:id': 'show'
  },

  index: function() {
    alert("course index page");
  },

  show: function(id) {
    alert("course viewing page for " + id);
  }
  

});
