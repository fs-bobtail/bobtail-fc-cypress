import accountSettingsPage from "../../support/pages/accountSettingsPage";
import dashboardPage from "../../support/pages/dashboardPage";
import loginPage from "../../support/pages/loginPage";

describe("Account settings Page Test Cases", function () {
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

  it("TC1 - Should navigate to Account Settings and verify title", function () {
    accountSettingsPage.clickAccountSettingsOption();
    accountSettingsPage.verifyAccountSettingsHeading();
  });

  it("TC2 - Should be able to navigate to Spend limits and verify spending limits", function () {
    accountSettingsPage.clickAccountSettingsOption();
    accountSettingsPage.clickSpendLimitsTab();
    accountSettingsPage.verifySpendLimitsValues();
  });

  it("TC3 - Should be able to navigate to Notifications and Enable/Disable notifications", function () {
    accountSettingsPage.clickAccountSettingsOption();
    accountSettingsPage.clickNotificationsTab();
    accountSettingsPage.clickNotificationsToggle();
    accountSettingsPage.verifyNotificationsToast();
  });
});
