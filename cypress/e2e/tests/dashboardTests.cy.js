import loginPage from "../../support/pages/loginPage";
import dashboardPage from "../../support/pages/dashboardPage";
import forgotPasswordPage from "../../support/pages/forgotPasswordPage";

describe("Dashboard Tests", function () {
  beforeEach(function () {
    cy.visit("/");
    cy.fixture("testdata.json").then((creds) => {
      loginPage.login(creds.email, creds.password);
    });
    dashboardPage.verifyAndClosePostLoginPopup();
  });

  it("TC1 - Verify header buttons on dashboard", function () {
    dashboardPage.verifyFleetButtonIsSelected();
    dashboardPage.verifyLoadsaAndFactoringButtonURL();
  });

  it("TC1 - Verify account menu shows correct name and email", function () {
    cy.fixture("testdata.json").then((data) => {
      dashboardPage.accountMenuBtn().contains(data.companyName);
      dashboardPage.accountMenuBtn().click();
      dashboardPage.accountMenuName().contains(data.companyName);
      dashboardPage.accountMenuEmail().contains(data.email);
      dashboardPage.logoutBtn().should('exist');
    });
  });
});
