class DashboardPage {
  //locators
  title = () => cy.contains("Congratulations!");
  subtitle = () =>
    cy.contains("You have qualified for TA Truck Service discounts!");
  closeButton = () => cy.get('img[data-cy="baseModal-closeBtn"]');
  loadsButton = () => cy.get('button[data-cy="products-menu-item-0"]');
  factoringButton = () => cy.get('button[data-cy="products-menu-item-1"]');
  fleetButton = () => cy.get('button[data-cy="products-menu-item-2"]');
  accountMenuBtn = () => cy.get('div[data-cy="business-menu-trigger"]');
  accountMenuName = () => cy.get('div[data-cy="business-menu-profile-section"] label').first();
  accountMenuEmail = () => cy.get('div[data-cy="business-menu-profile-section"] label').last();
  logoutBtn = () => cy.get('div[data-cy="business-menu-item-0"]');
  weeklyCreditLimit = () => cy.get('p[data-cy="cardsBreakDown-remainingLimit"]');

  //methods
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

  verifyFleetButtonIsSelected() {
    this.fleetButton().should("have.css", "background-color", "rgb(3, 89, 83)");
  }

  verifyLoadsaAndFactoringButtonURL() {
    this.loadsButton().should(
      "have.css",
      "background-color",
      "rgb(255, 255, 255)"
    );
    this.factoringButton().should(
      "have.css",
      "background-color",
      "rgb(255, 255, 255)"
    );
    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });

    this.loadsButton().click();

    cy.get("@windowOpen").should(
      "be.calledWithMatch",
      "https://loads-development.bobtailtest.com/"
    );

    this.factoringButton().click();

    cy.get("@windowOpen").should(
      "be.calledWithMatch",
      "https://factoring-development.bobtailtest.com/"
    );
  }
}

export default new DashboardPage();
