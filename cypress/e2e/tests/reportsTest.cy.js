import loginPage from "../../support/pages/loginPage";
import dashboardPage from "../../support/pages/dashboardPage";
import ReportsPage from "../../support/pages/reportsPage";

describe("Reports Page Test Cases", function () {
  before(function () {
    cy.visit("/");
    cy.fixture("testdata.json").then((creds) => {
      loginPage.login(creds.email, creds.password);
    });
    dashboardPage.verifyAndClosePostLoginPopup();
  });

  afterEach(function () {
    cy.clearCookies();
  });

  it("TC11 - should navigate to the Reports section from the left menu", () => {
    ReportsPage.navigateToReportsPage();
    cy.contains("h2", "Reports").should("be.visible"); // Adjust as per actual header
    ReportsPage.verifyReportsTabs();
  });
});
