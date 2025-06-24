class ReportsPage {
  menuOption = () =>
    cy.contains("div.each-option", "Reports").should("be.visible");
  tabByName = (name) => cy.get(".ant-tabs-tab-btn").contains(name);
  activeTabContent = () => cy.get(".ant-tabs-tabpane-active");


  navigateToReportsPage() {
      this.menuOption().click({ force: true });
    }
  verifyReportsTabs() {
    const tabs = ["Statements", "Payments", "IFTA Reports", "Business Credit"];

    tabs.forEach((tabName) => {
      cy.get(".ant-tabs-tab-btn").contains(tabName).click();
      cy.get(".ant-tabs-tabpane-active", { timeout: 10000 }).should(
        "be.visible"
      );
      cy.get(".ant-tabs-tabpane-active").then(($tab) => {
        const hasData = $tab.find(".data-rows").length > 0;

        if (hasData) {
          cy.wrap($tab).find(".data-rows").should("exist");
        } else {
          cy.wrap($tab)
            .contains(/There are no/i)
            .should("be.visible");
        }
      });
    });
  }
}

export default new ReportsPage();
