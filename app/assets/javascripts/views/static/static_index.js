Eduki.Views.StaticIndex = Backbone.View.extend({

  template: JST['static/index'],
  events: {
    'click .toggle': 'toggleForm',
  },

  initialize: function() {
    // nothing to initialize
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  toggleForm: function() {
    var type = 'login';
    if ($('form').attr('id') == 'login')
      type = 'signup'

    $('form').attr('id', type);
    $('form h1').html(type);
    $('button span').html(type);
    $('.toggle').attr('id', 'toggle-' + type);
  },
});
