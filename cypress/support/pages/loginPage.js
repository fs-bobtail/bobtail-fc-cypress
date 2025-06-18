class LoginPage {
  email = () => cy.xpath('//*[@id="1-email"]');
  password = () => cy.xpath('//*[@id="1-password"]');
  continue = () => cy.xpath('//*[@id="1-submit"]/span');

  login(email, password) {
    this.email()
      .then(($input) => {
        if ($input.val() !== "") {
          cy.wrap($input).clear();
        }
      })
      .type(email);

    this.password().type(password);
    this.continue().click({ force: true });

    cy.wait(2000); // Optional: Replace with smarter wait or intercept
  }

  verifyLoginFields() {
    this.email()
      .should("be.visible")
      .and("be.enabled")
      .and("have.attr", "placeholder", "Email address");

    this.password()
      .should("be.visible")
      .and("be.enabled")
      .and("have.attr", "placeholder", "Password");
  }

  checkRedirect() {
    this.email().should("be.visible");

    cy.url().then((actualURL) => {
      cy.log("Actual URL:", actualURL);
      expect(actualURL.startsWith("https://auth.bobtailtest.com/login?state="))
        .to.be.true;
    });
  }
}

export default new LoginPage();
