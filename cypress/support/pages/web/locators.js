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

}


module.exports = new locators();