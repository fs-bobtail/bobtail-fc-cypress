import CardsPage from "../../support/pages/cardsPage";
import dashboardPage from "../../support/pages/dashboardPage";
import loginPage from "../../support/pages/loginPage";

describe("Login Tests", function () {

    beforeEach(function () {
      cy.visit("/");
      cy.fixture("testdata.json").then((creds) => {
        loginPage.login(creds.email, creds.password);
      });
      dashboardPage.verifyAndClosePostLoginPopup();
    });

  it("TC1 - Should navigate to Cards page and verify title", function () {
      CardsPage.navigateToCardsPage();
    });
  
    // it('TC - Should verify filters on card page', function () {
    //   //  homePage.navigateToCardsPage();  // Assuming it handles login
    //     homePage.verifyCardFilters();
    // });
  
    it("TC2 - Verify that toggle button clickable and Enable the scurity", function () {
      CardsPage.securityEnableToggle();
    });
});
