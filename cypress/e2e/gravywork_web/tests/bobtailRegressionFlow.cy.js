import homePage from '../../../support/pages/web/commands/commandsHomePage.js';

describe('Automation Test Suite for fleet Card(Bobtail)', function () {
    let uuid, id;
    uuid = () => Cypress._.random(0, 1e6);
    id = uuid();
    
    before(function () {
        cy.clearCookies();
        cy.clearAllSessionStorage();
        cy.clearAllLocalStorage();
        cy.clearCookies();
        cy.visit('/');
    });

    beforeEach(function () {
        cy.viewport(window.screen.width, window.screen.height);
        cy.wait(1000);
    });

    it('TC1 - Should display email and password input fields', function () {
        homePage.verifyLoginFields();
    });

    it('TC2 - Verify the Auth URL', function () {
        homePage.checkRedirect();
    });

    it('TC3 - Should verify forgot password bar', function () {
        homePage.verifyForgotPasswordFlow();
    });

    it('TC4 - Login to the app', function () {
        homePage.login(); 
    });

    it('TC5 - should verify URL and browser title after login', function () {
        homePage.verifyPostLoginUrlAndTitle();
    });

    it('TC6 - Should navigate to Cards page and verify title', function () {
        homePage.navigateToCardsPage();
    });

it('TC - Filter by Active cards', function () {
  homePage.verifyCardFilterStatus('Active', 'ACTIVE');
});

it('TC - Filter by Closed cards - no data case', function () {
  homePage.verifyCardFilterStatus('Closed', 'NO_DATA');
});



});
