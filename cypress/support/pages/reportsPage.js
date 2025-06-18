class ReportsPage {
  menuOption = () =>
    cy.contains("div.each-option", "Reports").should("be.visible");
  tabByName = (name) => cy.get(".ant-tabs-tab-btn").contains(name);
  activeTabContent = () => cy.get(".ant-tabs-tabpane-active");
}

export default new ReportsPage();
