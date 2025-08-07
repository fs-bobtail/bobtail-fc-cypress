class fuelFinderPage {

    fuelFinderMenu = () => '.each-option .semi-bold.primary-color:contains("Fuel Finder")';
    searchLocationInput = () => 'input[placeholder="Search location"]';
    locationDropdownOptions = () => 'li.select-option';
    routeButton = () => 'span.ml-5 span';
    destinationInput = () => 'input[placeholder="Destination"]';
  


    clickFuelFinderMenu() {
        cy.get(this.fuelFinderMenu(), { timeout: 10000 }).first().should('be.visible').click({ force: true });
    }

    enterSearchLocation(cityName) {
        cy.get(this.searchLocationInput(), { timeout: 10000 }).should('be.visible').type(cityName);  // to search the first location, given New York
        cy.get(this.locationDropdownOptions()).first().should('be.visible').click(); //To select the first option from the dropdown
        cy.contains('span', 'Route').click(); // to ckicj the Route button
    }
    enterDestination(cityName) {
        cy.get(this.destinationInput(), { timeout: 10000 }).should('be.visible').type(cityName);   // to search the destination, given Seattle
        cy.get(this.locationDropdownOptions()).first().should('be.visible').click();   //To select the first option from the dropdown of locations
        cy.contains('Mauston Interstate Bp', { timeout: 90000 }).should('be.visible').click();  
    }

    clickReserveFuelButton() {
        cy.contains('button', 'Reserve Fuel', { timeout: 60000 })
            .should('be.visible')
            .and('not.be.disabled')
            .click();
    }
}

export default new fuelFinderPage();