import savingsPage from "../../support/pages/savingsPage.js";
import dashboardPage from "../../support/pages/dashboardPage";
import loginPage from "../../support/pages/loginPage";

describe("Transaction Page Test Cases", function () {
    before(function () {
      cy.visit("/");
      cy.fixture("testdata.json").then((creds) => {
        loginPage.login(creds.testEmail, creds.testPassword);
      });
      dashboardPage.verifyAndClosePostLoginPopup();
    });

  it("TC1 - Should navigate to Savings page and verify title", function () {
    savingsPage.clickSavingsOption();
  });

});
