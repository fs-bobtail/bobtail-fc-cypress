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
}

export default new CardsPage();
