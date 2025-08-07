import dashboardPage from "../../support/pages/dashboardPage";
import loginPage from "../../support/pages/loginPage";
import fuelFinderPage from "../../support/pages/fuelFinderPage";

    before(function () {
      cy.visit("/");
      cy.fixture("testdata.json").then((creds) => {
        loginPage.login(creds.email, creds.password);
      });
      dashboardPage.verifyAndClosePostLoginPopup();
    });

describe("Transaction Page Test Cases", function () {
  it("TC1 - Should navigate to Fuel Finder page and verify title", function () {
    fuelFinderPage.clickFuelFinderMenu();
  });

  it("TC2 - Should be able to select route and vendor", function () {
    fuelFinderPage.enterSearchLocation("New York");
    fuelFinderPage.enterDestination("Seattle");
    fuelFinderPage.clickReserveFuelButton();
  });

  it("TC3 - Should be able to Add reservation", function () {
    fuelFinderPage.clickReserveFuelButton();
  });
});
