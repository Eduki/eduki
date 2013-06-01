describe('Course Search', function() {
  beforeEach(function() {
    setupFakeServer();
  });

  it('Renders', function() {
    var view = new Eduki.Views.CoursesSearch();
    expect(view.$el.find('#search-query'));
    expect(view.$el.find('#search-button'));
  });

});
