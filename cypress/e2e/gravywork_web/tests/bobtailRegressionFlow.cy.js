import homePage from '../../../support/pages/web/commands/commandsHomePage.js';

describe('Automation Test Suite for fleet Card(Bobtail)', function () {
    let uuid, id;
    uuid = () => Cypress._.random(0, 1e6);
    id = uuid()
    
    before(function () {
        cy.clearCookies();
        cy.clearAllSessionStorage()
        cy.clearAllLocalStorage()
        cy.clearCookies()
        cy.visit('/');
    })
    beforeEach(function () {
        cy.viewport(window.screen.width, window.screen.height)
        cy.wait(1000);
    })
    it('TC1 - Login to the app', function () {
        homePage.login();
    })
})
