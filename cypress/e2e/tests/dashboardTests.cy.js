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

  it("TC2 - Verify account menu shows correct name and email", function () {
    cy.fixture("testdata.json").then((data) => {
      dashboardPage.accountMenuBtn().contains(data.companyName);
      dashboardPage.accountMenuBtn().click();
      dashboardPage.accountMenuName().contains(data.companyName);
      dashboardPage.accountMenuEmail().contains(data.email);
      dashboardPage.logoutBtn().should('exist');
    });
  });

  it("TC3+4 - Verify account shows correct banners and weekly credit limit", function () {
    cy.contains("🎉 Great News! Your fleet cards now support non-fuel purchases.");
    cy.contains("You can now pay for repairs, maintenance, tires, and more! ");
    cy.contains("🔒 Introducing smart security!");
    cy.contains("Your card stays locked and unlocks instantly when your driver texts the last 4 digits of the card. ");
    dashboardPage.weeklyCreditLimit().contains('$2,500.00')
  });

});
