/* This helper file is included in all javascript tests
 * Add shared code here
 * - David Mah
 */
//= require application.js

function setupFixtures() {
  jasmine.getFixtures().fixturesPath = "assets/fixtures"
  jasmine.getJSONFixtures().fixturesPath = "assets/fixtures/json"
}

setupFixtures();
