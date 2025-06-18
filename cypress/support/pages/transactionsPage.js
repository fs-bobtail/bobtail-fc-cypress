class TransactionsPage {
  transactionsMenuOption = () =>
    cy.contains("p", "Transactions").parents(".each-option");

  transactionsHeader = () => cy.get('[data-cy="transactionsHeader-heading"]');
  cardFilter = () => cy.get('[data-cy="transactionsFilter-Card"] input');
  truckFilter = () => cy.get('[data-cy="transactionsFilter-Truck"] input');
  driverFilter = () => cy.get('[data-cy="transactionsFilter-Driver"] input');
  statusFilter = () => cy.get('[data-cy="transactionsFilter-Status"] input');
  dateFilterStart = () =>
    cy.get('.ant-picker-range input[placeholder="Start Date"]');
  dateFilterEnd = () =>
    cy.get('.ant-picker-range input[placeholder="End Date"]');
  exportButton = () => cy.get('[data-cy="transactionsFilter-exportBtn"]');
  exportModalTitle = () =>
    cy.get(".modal-title").contains("Export Transaction");
  exportModalButton = () => cy.get('[data-cy="base-primary-button"]');
}

export default new TransactionsPage();
