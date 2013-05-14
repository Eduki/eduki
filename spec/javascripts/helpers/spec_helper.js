/* This helper file is included in all javascript tests
 * Add shared code here
 * - David Mah
 */
//= require application.js

var fixtures;
// Setup Fixture Data for tests to reference
function setupFixtures() {
  jasmine.getFixtures().fixturesPath = "assets/fixtures";
  jasmine.getJSONFixtures().fixturesPath = "assets/fixtures/json";
  fixtures = loadJSONFixtures("course.json", "courses.json");
}
setupFixtures();

// Setup Fake Server to respond to AJAX requests
// Should be called from the context of a test
function setupFakeServer() {
  beforeEach(function() {
    this.server = sinon.fakeServer.create();
    this.server.answeredIndex = 0;
  });
  afterEach(function() {
    this.server.restore();
  });
}

// Responds to the least recently made but still unanswered
// ajax request in server with a HTTP of code and the object in data.
// Should be called from the context of a test
function serverRespond(server, code, data) {
  server.requests[server.answeredIndex].respond(
    code,
    {"Content-Type": "application/json"},
    JSON.stringify(data)
  );
  server.answeredIndex += 1;
}
