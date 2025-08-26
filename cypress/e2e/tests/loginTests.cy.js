import loginPage from "../../support/pages/loginPage";
import dashboardPage from "../../support/pages/dashboardPage";
import forgotPasswordPage from "../../support/pages/forgotPasswordPage";

describe("Login Tests", function () {
  beforeEach(function () {
    cy.visit("/");
    loginPage.verifyLoginFields();
  });

  afterEach(function () {
    cy.clearCookies();
  });

  it("TC1 - Verify URL redirection", function () {
    loginPage.checkRedirect();
  });

  it("TC2 - Verify Login fields available", function () {
    loginPage.verifyLoginFields();
  });

  it("TC3 - Verify Login with invalid credentials should show error", function () {
    loginPage.login("mehreeenhumraz@gmail.com", "abcd12345@");
    cy.contains("Wrong email or password.");
  });

  it("TC4 - Verify forgot password flow works correctly", function () {
    forgotPasswordPage.verifyForgotPasswordFlow();
  });

  it("TC5 - Verify Login with valid credentials works correctly", function () {
    loginPage.verifyLoginFields();
    loginPage.checkRedirect();
    cy.fixture("testdata.json").then((creds) => {
      loginPage.login(creds.email, creds.password);
    });
    dashboardPage.verifyPostLoginUrlAndTitle();
  });
});
