import loginPage from "../../support/pages/loginPage";
import dashboardPage from "../../support/pages/dashboardPage";
import forgotPasswordPage from "../../support/pages/forgotPasswordPage";

describe("Login Tests", function () {
  beforeEach(function () {
    cy.visit("/");
    loginPage.verifyLoginFields();
  });

  it("TC1 - Verify Login with invalid credentials should show error", function () {
    loginPage.login("mehreeenhumraz@gmail.com", "abcd12345@");
    cy.contains("Wrong email or password.");
  });

  it("TC1 - Verify forgot password flow works correctly", function () {
    forgotPasswordPage.verifyForgotPasswordFlow();
  });

  it("TC3 - Verify Login with valid credentials works correctly", function () {
    loginPage.verifyLoginFields();
    loginPage.checkRedirect();
    cy.fixture("testdata.json").then((creds) => {
      loginPage.login(creds.email, creds.password);
    });
    dashboardPage.verifyPostLoginUrlAndTitle();
  });
});
