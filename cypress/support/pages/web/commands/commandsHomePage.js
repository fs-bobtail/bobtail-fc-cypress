// ***********************************************
// This Commands Home Page.js shows the
// create various custom commands and overwrite
// existing commands.
// ***********************************************

import locators from '../locators.js';

// -- This is a Home Page command --
class homePage {
    login() {
        locators.enterLoginCredentials.email()
            .then($input => {
                if ($input.val() !== '') {
                    cy.wrap($input).clear();
                }
            })
            .type('mubeenbobtail+1@gmail.com');

        locators.enterLoginCredentials.password().type('Mubeen@123');
        locators.enterLoginCredentials.continue().click({ force: true });

        // Wait and close popup if it shows
        cy.wait(2000); // Ideally replace with smarter wait
        // this.verifyAndClosePostLoginPopup();
    }

    verifyLoginFields() {
        locators.enterLoginCredentials.email()
            .should('be.visible')
            .and('be.enabled')
            .and('have.attr', 'placeholder', 'Email address');

        locators.enterLoginCredentials.password()
            .should('be.visible')
            .and('be.enabled')
            .and('have.attr', 'placeholder', 'Password');
    }

    checkRedirect() {
        locators.enterLoginCredentials.email().should('be.visible');

        cy.url().then((actualURL) => {
            cy.log('Actual URL:', actualURL);
            expect(actualURL.startsWith('https://auth.bobtailtest.com/login?state=')).to.be.true;
        });
    }

    verifyForgotPasswordFlow() {
        // Click forgot password link
        locators.forgotPassword.link().should('be.visible').click();

        // Verify heading appears
        locators.forgotPassword.heading().should('be.visible');

        // Verify email field
        locators.forgotPassword.forgotEmail()
            .should('be.visible')
            .type('testuser@example.com');

        // Click Send Email button
        locators.forgotPassword.sendEmailButton().should('be.visible').click();

        // Verify success message
        locators.forgotPassword.successText().should('be.visible');
    }

    verifyPostLoginUrlAndTitle() {
        cy.url({ timeout: 10000 }).should('eq', 'https://card-app.bobtailtest.com/home');
        cy.title({ timeout: 10000 }).should('eq', 'Bobtail - Fleet Card');
    }

    verifyAndClosePostLoginPopup() {
        locators.postLoginPopup.title()
            .should('be.visible')
            .and('contain.text', 'Congratulations!')
            .should('exist');

        locators.postLoginPopup.subtitle()
            .should('be.visible')
            .and('contain.text', 'You have qualified for TA Truck Service discounts!')
            .should('exist');

        locators.postLoginPopup.closeButton()
            .should('be.visible')
            .click();
    }

  navigateToCardsPage() {
 
        cy.get('.fc-base-modal', { timeout: 10000 }).should('not.exist');

        
        locators.cardsPage.menuOption()
            .should('be.visible')
            .and('contain.text', 'Cards')
            .click();

        
        cy.url({ timeout: 10000 }).should('eq', 'https://card-app.bobtailtest.com/cards');
        locators.cardsPage.heading()
            .should('be.visible')
            .and('contain.text', 'Cards');
    }

   
verifyCardFilterStatus(filterType, expectedStatusText) {
  const filters = {
    All: locators.cardsPage.filterAll,
    Active: locators.cardsPage.filterActive,
    Inactive: locators.cardsPage.filterInactive,
    Closed: locators.cardsPage.filterClosed
  };

  // Click the desired filter
  filters[filterType]().should('be.visible').click();

  // If expecting no data
  if (expectedStatusText === 'NO_DATA') {
    locators.cardsPage.noDataText().should('be.visible');
  } else {
    // Otherwise, validate that every visible card has expected status
    locators.cardsPage.tableRows().each(($row) => {
      cy.wrap($row).should('contain.text', expectedStatusText);
    });
  }
}





}

module.exports = new homePage();
