import dashboardPage from "../../support/pages/dashboardPage";
import loginPage from "../../support/pages/loginPage";
import fuelFinderPage from "../../support/pages/fuelFinderPage";

describe("Fuel Finder Page Test Cases", function () {
  beforeEach(function () {
    cy.visit("/");
    cy.fixture("testdata.json").then((creds) => {
      loginPage.login(creds.testEmail, creds.testPassword);
    });
    dashboardPage.verifyAndClosePostLoginPopup();
  });

  afterEach(function () {
    cy.clearCookies();
  });

  it("TC1 - Should navigate to Fuel Finder page and verify title", function () {
    fuelFinderPage.clickFuelFinderMenu();
  });

  it("TC2 - Should be able to select route and vendor", function () {
    fuelFinderPage.clickFuelFinderMenu();
    fuelFinderPage.enterSearchLocation("New York");
    fuelFinderPage.enterDestination("Seattle");
    fuelFinderPage.clickAnyVendor();
  });
});
