import TransactionsPage from "../../support/pages/transactionsPage";
import dashboardPage from "../../support/pages/dashboardPage";
import loginPage from "../../support/pages/loginPage";

describe("Login Tests", function () {

    before(function () {
      cy.visit("/");
      cy.fixture("testdata.json").then((creds) => {
        loginPage.login(creds.email, creds.password);
      });
      dashboardPage.verifyAndClosePostLoginPopup();
    });

  it("TC1 - Should navigate to Transaction page and verify title", function () {
    TransactionsPage.clickTransactionsMenu();
  });

  it("TC2 - Should have filters on Transaction page ", function () {
    TransactionsPage.verifyTransactionsFilters();
  });

  it("TC3 - Verify export button ", function () {
    TransactionsPage.verifyTransactionsExport();
  });
});
