// ***********************************************
// This Commands Home Page.js shows the
// create various custom commands and overwrite
// existing commands.
// ***********************************************

import locators from "../web/locators.js";

// -- This is a Home Page command --
class homePage {
  login() {
    locators.enterLoginCredentials
      .email()
      .then(($input) => {
        if ($input.val() !== "") {
          cy.wrap($input).clear();
        }
      })
      .type("mubeenbobtail+1@gmail.com");

    locators.enterLoginCredentials.password().type("Mubeen@123");
    locators.enterLoginCredentials.continue().click({ force: true });

    // Wait and close popup if it shows
    cy.wait(2000); // Ideally replace with smarter wait
    // this.verifyAndClosePostLoginPopup();
  }

  verifyLoginFields() {
    locators.enterLoginCredentials
      .email()
      .should("be.visible")
      .and("be.enabled")
      .and("have.attr", "placeholder", "Email address");

    locators.enterLoginCredentials
      .password()
      .should("be.visible")
      .and("be.enabled")
      .and("have.attr", "placeholder", "Password");
  }

  checkRedirect() {
    locators.enterLoginCredentials.email().should("be.visible");

    cy.url().then((actualURL) => {
      cy.log("Actual URL:", actualURL);
      expect(actualURL.startsWith("https://auth.bobtailtest.com/login?state="))
        .to.be.true;
    });
  }

  verifyForgotPasswordFlow() {
    locators.forgotPassword.link().should("be.visible").click();
    locators.forgotPassword.heading().should("be.visible");
    locators.forgotPassword
      .forgotEmail()
      .should("be.visible")
      .type("testuser@example.com");

    locators.forgotPassword.sendEmailButton().should("be.visible").click();
    locators.forgotPassword.successText().should("be.visible");
  }

  verifyPostLoginUrlAndTitle() {
    cy.url({ timeout: 10000 }).should(
      "eq",
      "https://card-app.bobtailtest.com/home"
    );
    cy.title({ timeout: 10000 }).should("eq", "Bobtail - Fleet Card");
  }

  verifyAndClosePostLoginPopup() {
    locators.postLoginPopup
      .title()
      .should("be.visible")
      .and("contain.text", "Congratulations!")
      .should("exist");

    locators.postLoginPopup
      .subtitle()
      .should("be.visible")
      .and("contain.text", "You have qualified for TA Truck Service discounts!")
      .should("exist");

    locators.postLoginPopup.closeButton().should("be.visible").click();
  }

  navigateToCardsPage() {
    cy.get(".fc-base-modal", { timeout: 10000 }).should("not.exist");
    locators.cardsPage
      .menuOption()
      .should("be.visible")
      .and("contain.text", "Cards")
      .click();
    cy.url({ timeout: 10000 }).should(
      "eq",
      "https://card-app.bobtailtest.com/cards"
    );
    // locators.cardsPage.heading()
    //     .should('be.visible')
    //     .and('contain.text', 'Cards');
  }

  //    clickEnabledToggles() {
  //   locators.cardsPage.enabledToggles().each(($toggle) => {
  //     cy.wrap($toggle).click({ force: true });
  //   });
  securityEnableToggle() {
    let clicked = false;
    locators.cardsPage.enabledToggles().each(($toggle) => {
      if (clicked) return false;
      const $el = Cypress.$($toggle);
      const isToggle = $el.hasClass("toggle") || $el.attr("role") === "switch";

      if (isToggle) {
        cy.wrap($el)
          .invoke("prop", "checked")
          .then((isChecked) => {
            if (!isChecked) {
              cy.wrap($el).click({ force: true });
              clicked = true;
              cy.contains("Card Unlock Security", { timeout: 5000 }).should(
                "be.visible"
              );
              cy.contains("button", "Enable", { timeout: 5000 })
                .should("be.visible")
                .click();
              cy.contains("Card security Enabled for", {
                timeout: 5000,
              }).should("be.visible");
            }
          });
      }
    });
  }

  clickTransactionsMenu() {
    locators.transactionsPage.transactionsMenuOption().click({ force: true });
    locators.transactionsPage
      .transactionsHeader()
      .should("be.visible")
      .and("contain.text", "Transactions");
  }
  verifyTransactionsFilters() {
    locators.transactionsPage
      .cardFilter()
      .should("be.visible")
      .click({ force: true });
    locators.transactionsPage
      .truckFilter()
      .should("be.visible")
      .click({ force: true });
    locators.transactionsPage
      .driverFilter()
      .should("be.visible")
      .click({ force: true });
    locators.transactionsPage
      .statusFilter()
      .should("be.visible")
      .click({ force: true });
    locators.transactionsPage
      .dateFilterStart()
      .should("be.visible")
      .click({ force: true });
    locators.transactionsPage
      .dateFilterEnd()
      .should("be.visible")
      .click({ force: true });
  }

  verifyTransactionsExport() {
    locators.transactionsPage
      .exportButton()
      .should("be.visible")
      .click({ force: true });
    locators.transactionsPage.exportModalTitle().should("be.visible");
    cy.intercept(
      "GET",
      "https://card-api.bobtailtest.com/transactions/export/csv"
    ).as("csvDownload");
    locators.transactionsPage.exportModalButton().should("be.visible").click();
    // cy.wait('@csvDownload').its('response.statusCode').should('eq', 200);
  }

  navigateToReportsPage() {
    locators.reportsPage.menuOption().click({ force: true });
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

// verifyCardFilters() {
//   // Verify Cards heading
// //   locators.cardFilters.heading().should('contain.text', 'Cards');

//   // Check "All" filter
//   locators.cardFilters.filterAll().click();
//   cy.wait(1000);
//   locators.cardFilters.tableRows().its('length').should('be.greaterThan', 0);

//   // Check "Active" filter
//   locators.cardFilters.active().click();
//   cy.wait(1000);
//   this.checkStatusInTableOrEmptyState('ACTIVE');

//   // Check "Inactive" filter
//   locators.cardFilters.inactive().click();
//   cy.wait(1000);
//   this.checkStatusInTableOrEmptyState('INACTIVE');

//   // Check "Closed" filter
//   locators.cardFilters.closed().click();
//   cy.wait(1000);
//   this.checkStatusInTableOrEmptyState('CLOSED');
// }

// checkStatusInTableOrEmptyState(expectedStatus) {
//   locators.cardFilters.noDataText().then(($el) => {
//     if ($el.length > 0) {
//       cy.wrap($el).should('be.visible');
//     } else {
//       locators.cardFilters.cardStatusCells().each(($cell) => {
//         cy.wrap($cell).should('contain.text', expectedStatus);
//       });
//     }
//   });
module.exports = new homePage();
