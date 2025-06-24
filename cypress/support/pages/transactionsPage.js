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

  clickTransactionsMenu() {
      this.transactionsMenuOption().click({ force: true });
      this.transactionsHeader()
        .should("be.visible")
        .and("contain.text", "Transactions");
    }
    verifyTransactionsFilters() {
      this.cardFilter()
        .should("be.visible")
        .click({ force: true });
      this.truckFilter()
        .should("be.visible")
        .click({ force: true });
      this.driverFilter()
        .should("be.visible")
        .click({ force: true });
      this.statusFilter()
        .should("be.visible")
        .click({ force: true });
      this.dateFilterStart()
        .should("be.visible")
        .click({ force: true });
      this.dateFilterEnd()
        .should("be.visible")
        .click({ force: true });
    }
  
    verifyTransactionsExport() {
      this.exportButton()
        .should("be.visible")
        .click({ force: true });
      this.exportModalTitle().should("be.visible");
      cy.intercept(
        "GET",
        "https://card-api.bobtailtest.com/transactions/export/csv"
      ).as("csvDownload");
      this.exportModalButton().should("be.visible").click();
      // cy.wait('@csvDownload').its('response.statusCode').should('eq', 200);
    }
}

export default new TransactionsPage();
