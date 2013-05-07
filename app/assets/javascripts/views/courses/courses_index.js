Eduki.Views.CoursesIndex = Backbone.View.extend({

  template: JST['courses/index'],

  render: function() {
    this.banana = "no way";
    $(this.el).html(this.template());
    return this;
  }

});
