// ***********************************************
// This Locators.js shows the
// create various custom locators and overwrite
// existing locators.
// ***********************************************


class locators {
    enterLoginCredentials = {
        email: () => cy.xpath('//*[@id="1-email"]'),
        password: () => cy.xpath('//*[@id="1-password"]'),
        continue: () => cy.xpath('//*[@id="1-submit"]/span')
    }
     forgotPassword = {
        link: () => cy.get('#lock-container a:contains("Forgot password?")'), 
        heading: () => cy.contains('Reset your password'),
        forgotEmail: () => cy.get('#1-email'),  
        sendEmailButton: () => cy.get('#1-submit > span'),
        successText: () => cy.contains("We've just sent you an email to reset your password.")
    }

    postLoginPopup = {
        title: () => cy.contains('Congratulations!'),
        subtitle: () => cy.contains('You have qualified for TA Truck Service discounts!'),
        closeButton: () => cy.get('#app div div div:nth-child(2) div div:nth-child(2) div:nth-child(3) div:nth-child(2) div:nth-child(4) div div div:nth-child(1) div div')
    }

 
    cardsPage = {
  menuOption: () => cy.contains('div', 'Cards'),
  heading: () => cy.get('h2').contains('Cards'),


  filterAll: () => cy.get('[data-cy="cardListing-filters-all"]'),
  filterActive: () => cy.get('[data-cy="cardListing-filters-active"]'),
  filterInactive: () => cy.get('[data-cy="cardListing-filters-inactive"]'),
  filterClosed: () => cy.get('[data-cy="cardListing-filters-closed"]'),
  heading: () => cy.contains('h2', 'Cards'),
  tableRows: () => cy.get('.card-status'), // example, adjust selector to actual table row status
  noDataText: () => cy.contains('There is no data for the selected filter')


}


}


module.exports = new locators();