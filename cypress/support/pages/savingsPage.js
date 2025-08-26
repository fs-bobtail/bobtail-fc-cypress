class savingsPage {
  savingsOption() {
    return 'p:contains("Savings")';
  }

  clickSavingsOption() {
    cy.contains("p", "Savings").should("be.visible").click();
    cy.get("h2.semi-bold.font-size-20")
      .invoke("text")
      .should("eq", " Savings ");
  }
}
export default new savingsPage();
