import loginPage from "../../support/pages/loginPage";
import dashboardPage from "../../support/pages/dashboardPage";
import forgotPasswordPage from "../../support/pages/forgotPasswordPage";

describe("Dashboard Tests", function () {
  beforeEach(function () {
    cy.visit("/");
    cy.fixture("testdata.json").then((creds) => {
      loginPage.login(creds.email, creds.password);
    });
  });

  it("TC1 - Verify header buttons on dashboard", function () {
    dashboardPage.verifyAndClosePostLoginPopup();
    dashboardPage.verifyFleetButtonIsSelected();
    dashboardPage.verifyLoadsaAndFactoringButtonURL();
  });
});
