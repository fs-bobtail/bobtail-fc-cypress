class CardsPage {
  menuOption = () => cy.contains("div", "Cards");
  heading = () => cy.contains("h2", "Cards");
  filterAll = () => cy.get('[data-cy="cardListing-filters-all"]');
  filterActive = () => cy.get('[data-cy="cardListing-filters-active"]');
  filterInactive = () => cy.get('[data-cy="cardListing-filters-inactive"]');
  filterClosed = () => cy.get('[data-cy="cardListing-filters-closed"]');
  tableRows = () => cy.get(".card-status");
  noDataText = () => cy.contains("There is no data for the selected filter");
  enabledToggles = () => cy.get('input[type="checkbox"]:not([disabled])');
  allToggles = () => cy.get('input[type="checkbox"]');
  cardContainer = () => "div.d-grid.p-16";
  cardStatus = () => '[data-cy="cardListing-status"]';
  cardCheckbox = () => "input.ant-checkbox-input";


  navigateToCardsPage() {
      cy.get(".fc-base-modal", { timeout: 10000 }).should("not.exist");
      this.menuOption()
        .should("be.visible")
        .and("contain.text", "Cards")
        .click();
      cy.url({ timeout: 10000 }).should(
        "eq",
        "https://card-app.bobtailtest.com/cards"
      );
      // this.heading()
      //     .should('be.visible')
      //     .and('contain.text', 'Cards');
    }
  
    //    clickEnabledToggles() {
    //    this.enabledToggles().each(($toggle) => {
    //     cy.wrap($toggle).click({ force: true });
    //   });
    securityEnableToggle() {
      let clicked = false;
      thisenabledToggles().each(($toggle) => {
        if (clicked) return false;
        const $el = Cypress.$($toggle);
        const isToggle = $el.hasClass("toggle") || $el.attr("role") === "switch";
  
        if (isToggle) {
          cy.wrap($el)
            .invoke("prop", "checked")
            .then((isChecked) => {
              if (!isChecked) {
                cy.wrap($el).click({ force: true });
                clicked = true;
                cy.contains("Card Unlock Security", { timeout: 5000 }).should(
                  "be.visible"
                );
                cy.contains("button", "Enable", { timeout: 5000 })
                  .should("be.visible")
                  .click();
                cy.contains("Card security Enabled for", {
                  timeout: 5000,
                }).should("be.visible");
              }
            });
        }
      });
    }
}

export default new CardsPage();
