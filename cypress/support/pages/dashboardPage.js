class DashboardPage {
  title = () => cy.contains("Congratulations!");
  subtitle = () =>
    cy.contains("You have qualified for TA Truck Service discounts!");
  closeButton = () =>
    cy.get(
      "#app div div div:nth-child(2) div div:nth-child(2) div:nth-child(3) div:nth-child(2) div:nth-child(4) div div div:nth-child(1) div div"
    );

  verifyPostLoginUrlAndTitle() {
    cy.url({ timeout: 20000 }).should(
      "eq",
      "https://card-app.bobtailtest.com/home"
    );
    cy.title({ timeout: 20000 }).should("eq", "Bobtail - Fleet Card");
  }

  verifyAndClosePostLoginPopup() {
    this.title().should("be.visible").and("contain.text", "Congratulations!");

    this.subtitle().should(
      "contain.text",
      "You have qualified for TA Truck Service discounts!"
    );

    this.closeButton().click();
  }
}

export default new DashboardPage();
