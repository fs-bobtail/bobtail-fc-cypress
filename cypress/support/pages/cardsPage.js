class CardsPage {
  // NAVIGATION 
  menuOption = () => cy.contains("div", "Cards");
  heading = () => cy.contains("h2", "Cards");

  // FILTERS
  filterAll = () => cy.get('[data-cy="cardListing-filters-all"]');
  filterActive = () => cy.get('[data-cy="cardListing-filters-active"]');
  filterInactive = () => cy.get('[data-cy="cardListing-filters-inactive"]');
  filterClosed = () => cy.get('[data-cy="cardListing-filters-closed"]');

  // CARD TABLE 
  tableRows = () => cy.get(".card-status");
  noDataText = () => cy.contains("There is no data for the selected filter");
  enabledToggles = () => cy.get('input[type="checkbox"]:not([disabled])');
  allToggles = () => cy.get('input[type="checkbox"]');
  cardCheckbox = () => cy.get("input.ant-checkbox-input");

  // Security TOGGLES 
  securityToggle = () => cy.get('.columns-template .toggle-slider input[type="checkbox"]');

  cardToggleInput = (index = 0) =>
    cy.get(`div.toggle-slider input[type="checkbox"]`).eq(index);

  // == Non-fuel Toggle ==
  static nonFuelToggle() {
    return '[data-cy="cardListing-nonFuel"] input[type="checkbox"]';
  }
  nonFuelToggle = () => '.columns-template .toggle-slider:last-child';
  modalContainer = () => '.modal-content-container';
  limitInputs = () => '.modal-content-container input[data-cy="base-input-field"]';
  saveButton = () => 'button[data-cy="base-primary-button"]';
  toastMessage = () => '.Toastify__toast-body';

    // Filter buttons
  filterAll = () => '[data-cy="cardListing-filters-all"]';
  filterActive = () => '[data-cy="cardListing-filters-active"]';
  filterInactive = () => '[data-cy="cardListing-filters-inactive"]';
  filterClosed = () => '[data-cy="cardListing-filters-closed"]';

  // Filter counts
  filterCount = (key) => `[data-cy="cardListing-filters-${key}"] .card-count`;

  // Card rows and empty state
  emptyState = () => '.empty-state-message';

  filter = (key) => `[data-cy="cardListing-filters-${key}"]`;
  cardRows = () => '.cards-listing .columns-template:not(.card-table-header)';
  cardCountBadge = () => '.card-count';

  // Ellipse menu
  cardRowsEllipse = () => '.cards-listing .columns-template:not(.card-table-header)';
  firstCardEllipsis = () => '.cards-listing .columns-template:not(.card-table-header):first-child [data-cy="cardActions-menu"]';
   allRows = () => '.cards-listing .columns-template';
  
  // Ellipsis button inside a row
  rowEllipsis = () => '[data-cy="cardActions-menu"]';
  dropdownMenu = () => '.ant-dropdown-menu'; 
  allRows = () => '.cards-listing .columns-template';
  rowEllipsis = () => '[data-cy="cardActions-menu"]';
  dropdownMenu = () => '.ant-dropdown-menu';
  dropdownOption = (label) => `.ant-dropdown-menu li:contains("${label}")`;
  toastMessage = () => '.Toastify__toast-body';
  pinModal = () => '.modal-content-container';
  pinModalTitle = () => '.modal-title';
  pinField = () => '#ctl-set-pin';
  confirmPinField = () => '#ctl-confirm-pin';
  pinError = () => '.modal-content-container .error-text';
  savePinButton = () => 'button:contains("Save")';
  modalCloseButton = () => '[data-cy="baseModal-closeBtn"]';

  

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
  }

  enableCardSecurity(index = 0) {
    this.cardToggleInput(index).click({ force: true });
    cy.contains("Card Unlock Security", { timeout: 5000 }).should("be.visible");
    cy.contains("button", "Enable", { timeout: 5000 })
      .should("be.visible")
      .click();
    cy.contains("Card security Enabled for", { timeout: 5000 }).should(
      "be.visible"
    );
  }

  disableCardSecurity(index = 0) {
    this.cardToggleInput(index).click({ force: true });
    cy.contains("Card Unlock Security", { timeout: 5000 }).should("be.visible");
    cy.contains("button", "Disable", { timeout: 5000 })
      .should("be.visible")
      .click();
    cy.contains("Card security Disabled for", { timeout: 5000 }).should(
      "be.visible"
    );
  }

  clickFirstNonFuelToggle() {
  cy.wait(500);
  cy.get('.columns-template')
    .find('.toggle-slider')
    .filter((index) => index % 2 === 1) // Non-Fuel toggles
    .each(($toggle) => {
      cy.wrap($toggle).click({ force: true });
      return false; // 👈 breaks after first iteration
    });
}

  enableNonFuelLimits() {
    cy.get(this.modalContainer(), { timeout: 10000 }).should('be.visible');
    cy.get(this.limitInputs()).eq(0).clear().type('100'); 
    cy.get(this.limitInputs()).eq(1).clear().type('200'); 
    cy.get(this.limitInputs()).eq(2).clear().type('300');
    cy.get(this.saveButton()).click();
    cy.contains("Card settings saved successfully", { timeout: 5000 }).should(
      "be.visible"
        );
    cy.get(this.modalContainer()).should('not.exist');
  }

  disableNonFuelLimits() {
    cy.get(this.modalContainer(), { timeout: 10000 }).should('be.visible');
    cy.get(this.saveButton()).click();
    cy.contains("Card settings saved successfully", { timeout: 5000 }).should(
      "be.visible"
        );
    cy.get(this.modalContainer()).should('not.exist');
  }


  //////// Filter Functions   ///////////
  verifyFiltersVisible() {
    cy.get(this.filterAll(),     { timeout: 10000 }).should('be.visible');
    cy.get(this.filterActive(),  { timeout: 10000 }).should('be.visible');
    cy.get(this.filterInactive(),{ timeout: 10000 }).should('be.visible');
    cy.get(this.filterClosed(),  { timeout: 10000 }).should('be.visible');
  }

  waitForCardsToLoad() {
    cy.intercept('GET', 'https://card-api.bobtailtest.com/cards').as('getCards');
    cy.visit('https://card-app.bobtailtest.com/cards');
    cy.wait('@getCards', { timeout: 10000 });
  }

  capitalize(s) {
    return s && typeof s === 'string'
      ? s.charAt(0).toUpperCase() + s.slice(1)
      : '';
  }

  selectFilter(key) {
    cy.get(this.filter(key)).click();
  }

  verifyActiveFilter(key) {
    cy.get(this.filter(key)).should('have.class', 'active-card-filter');
    ['all', 'active', 'inactive', 'closed']
      .filter(k => k !== key)
      .forEach(other => {
        cy.get(this.filter(other)).should('have.class', 'grey-color-text');
      });
  }

  assertCardCount(expectedCount) {
    // Check badge count
    cy.get(this.cardCountBadge())
      .invoke('text')
      .then(text => {
        const clean = text.replace(/\D/g, '');
        const count = parseInt(clean, 10);
        expect(count).to.equal(expectedCount);
      });
    cy.get(this.cardRows())
      .filter(':visible')
      .should('have.length', expectedCount);
  }

  assertSomeCards() {
    cy.get(this.cardRows()).its('length').should('be.greaterThan', 0);
  }
  clickFirstCardEllipsis() {
    // Wait a moment for table to render
    cy.get(this.allRows(), { timeout: 10000 })
      .should('have.length.at.least', 2) // header + 1 data row
      .eq(1)                               // index 1 = first data row
      .find(this.rowEllipsis())
      .should('be.visible')
      .click({ force: true });
  }
  assertDropdownVisible() {
    cy.get(this.dropdownMenu(), { timeout: 10000 })
      .should('be.visible');
  }

  clickFirstCardEllipsis() {
    cy.get(this.allRows(), { timeout: 10000 })
      .eq(1)
      .find(this.rowEllipsis())
      .should('be.visible')
      .click({ force: true });
  }

  clickDropdownOption(label) {
    cy.get(this.dropdownMenu(), { timeout: 10000 })
      .contains('li', label)
      .should('be.visible')
      .click({ force: true });
  }

  assertToastMessage(expectedText) {
      cy.contains(expectedText, { timeout: 5000 }).should(
      "be.visible"
    );
  }


  clickFirstCardEllipsis() {
  cy.get(this.allRows(), { timeout: 10000 })
    .eq(1)
    .find(this.rowEllipsis())
    .should('be.visible')
    .click({ force: true });
}

clickDropdownOption(label) {
  cy.get(this.dropdownMenu(), { timeout: 10000 })
    .contains('li', label)
    .should('be.visible')
    .click({ force: true });
}

closeModal() {
  cy.get(this.modalCloseButton(), { timeout: 10000 })
    .should('be.visible')
    .click({ force: true });
}

}                                                                                                                                                                                   


export default new CardsPage();   