import CardsPage from "../../support/pages/cardsPage";
import dashboardPage from "../../support/pages/dashboardPage";
import loginPage from "../../support/pages/loginPage";

describe("Cards Page Test Cases", function () {

    beforeEach(function () {
      cy.visit("/");
      cy.fixture("testdata.json").then((creds) => {
        loginPage.login(creds.email, creds.password);
      });
      dashboardPage.verifyAndClosePostLoginPopup();
      CardsPage.waitForCardsToLoad();
    });
 
  it("TC1 - Should navigate to Cards page and verify title", function () {
      CardsPage.navigateToCardsPage();
    });
  
    it('TC - Should verify filters on card page', function () {
      //  homePage.navigateToCardsPage();  // Assuming it handles login
        homePage.verifyCardFilters();
    });
  
    it("TC2 - Verify that toggle button clickable and Enable the scurity", function () {
      CardsPage.enableCardSecurity(0);
    });
    it("TC3 - Disable the card security", function () {
      CardsPage.disableCardSecurity(0);
    });
    it("TC4 - Enable Non-Fuel Toggle", function () {
      CardsPage.clickFirstNonFuelToggle();
      CardsPage.enableNonFuelLimits();
    });
    it("TC5 - Disable Non-Fuel Toggle", function () {
      CardsPage.clickFirstNonFuelToggle();
      CardsPage.disableNonFuelLimits();
    });

  it('TC6 - should display all four filter options', () => {
    CardsPage.verifyFiltersVisible();
  });
    
   const scenarios = [
    { key: 'all', expectedCount: null },
    { key: 'active', expectedCount: 4 },
    { key: 'inactive', expectedCount: 0 },
    { key: 'closed', expectedCount: 1 }
  ];
  scenarios.forEach(({ key, expectedCount }) => {
    it(`selects "${key}" filter and verifies card list`, () => {
      CardsPage.selectFilter(key);
      CardsPage.verifyActiveFilter(key);

      if (expectedCount === null) {
        CardsPage.assertSomeCards();
      } else {
        cy.wait(3000); // Wait for the filter to apply
        CardsPage.assertCardCount(expectedCount);
      }
    });
  });

  it('TC7 - clicks the ellipsis menu on the first card row', () => {
    CardsPage.clickFirstCardEllipsis();
    CardsPage.assertDropdownVisible();
  });
  it('TC8 - freezes and unfreezes a card with proper toast messages', () => {
    // 1. Open menu and click Freeze
    CardsPage.clickFirstCardEllipsis();
    CardsPage.clickDropdownOption('Freeze');
    CardsPage.assertToastMessage('Card Frozen');

    // 2. Re-open menu to Unfreeze
    CardsPage.clickFirstCardEllipsis();
    CardsPage.clickDropdownOption('Unfreeze');
    CardsPage.assertToastMessage('Card Unfrozen');
  });

  it('TC9 - Assert all menu options in ellipse menu', () => {
    CardsPage.clickFirstCardEllipsis();
    CardsPage.clickDropdownOption('Change Pin');
    CardsPage.closeModal();

    CardsPage.clickFirstCardEllipsis();
    CardsPage.clickDropdownOption('Assign Truck');
    CardsPage.closeModal();

    CardsPage.clickFirstCardEllipsis();
    CardsPage.clickDropdownOption('Assign Driver');
    CardsPage.closeModal();

    CardsPage.clickFirstCardEllipsis();
    CardsPage.clickDropdownOption('Replace Card');
    CardsPage.closeModal();


    CardsPage.clickFirstCardEllipsis();
    CardsPage.clickDropdownOption('View Logs');
    CardsPage.closeModal();

    CardsPage.clickFirstCardEllipsis();
    CardsPage.clickDropdownOption('Spending Controls');
    CardsPage.closeModal();

  });

 

});
