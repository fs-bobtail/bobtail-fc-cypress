class ForgotPasswordPage {
  link = () => cy.get('#lock-container a:contains("Forgot password?")');
  heading = () => cy.contains("Reset your password");
  forgotEmail = () => cy.get("#1-email");
  sendEmailButton = () => cy.get("#1-submit > span");
  successText = () =>
    cy.contains("We've just sent you an email to reset your password.");

  verifyForgotPasswordFlow() {
    this.link().should("be.visible").click();
    this.heading().should("be.visible");
    this.forgotEmail().should("be.visible").type("testuser@example.com");

    this.sendEmailButton().should("be.visible").click();
    this.successText().should("be.visible");
  }
}

export default new ForgotPasswordPage();
