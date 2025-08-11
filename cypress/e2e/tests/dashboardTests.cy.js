import loginPage from "../../support/pages/loginPage";
import dashboardPage from "../../support/pages/dashboardPage";

describe("Dashboard Tests", function () {
  beforeEach(function () {
    cy.visit("/");
    cy.fixture("testdata.json").then((creds) => {
      loginPage.login(creds.testEmail, creds.testPassword);
    });
    dashboardPage.verifyAndClosePostWeeklyCreditPopup();
    dashboardPage.verifyAndClosePostLoginPopup();
  });

  it("TC1 - Verify header buttons on dashboard", function () {
    dashboardPage.verifyFleetButtonIsSelected();
    dashboardPage.verifyLoadsaAndFactoringButtonURL();
  });

  it("TC2 - Verify account menu shows correct name and email", function () {
    cy.fixture("testdata.json").then((data) => {
      dashboardPage.accountMenuBtn().contains(data.testCompanyName);
      dashboardPage.accountMenuBtn().click();
      dashboardPage.accountMenuName().contains(data.testCompanyName);
      dashboardPage.accountMenuEmail().contains(data.testEmail);
      dashboardPage.logoutBtn().should("exist");
    });
  });

  it("TC3+4 - Verify account shows correct banners and weekly credit limit", function () {
    cy.contains(
      "🎉 Great News! Your fleet cards now support non-fuel purchases."
    );
    cy.contains("You can now pay for repairs, maintenance, tires, and more! ");
    cy.contains("🔒 Introducing smart security!");
    cy.contains(
      "Your card stays locked and unlocks instantly when your driver texts the last 4 digits of the card. "
    );
    dashboardPage.weeklyCreditLimit().contains("$2,500.00");
  });

  it("TC5 - Verify account shows payment section", function () {
    dashboardPage.verifyPaymentsHeading();
    cy.contains(
      " Unpaid settled transactions will add up until the next two days. "
    );
    dashboardPage.clickStatementsBtn();
    cy.url().should("include", "/statements");
  });

  it("TC6 - Verify account shows expense history section", function () {
    dashboardPage.expenseHistorySection().contains("Expense history");
    dashboardPage
      .expenseHistorySection()
      .contains(" You will see total USD spent each week ");
    dashboardPage.expenseHistorySection().contains("Week 1");
    dashboardPage.expenseHistorySection().contains("Week 2");
    dashboardPage.expenseHistorySection().contains("Week 3");
    dashboardPage.expenseHistorySection().contains("Week 4");
  });

  it("TC7 - Verify account shows recent activity section", function () {
    cy.contains("Recent Activity");
    dashboardPage.verifyTransactionTableColumns();
    dashboardPage.viewAllTransactions().first().click();
    cy.url().should("include", "/transactions");
  });

  it("TC8 - Verify account shows bank section", function () {
    dashboardPage.selectedBankSection().contains('Checking ...0000');
    dashboardPage.selectedBankSection().contains(' Your upcoming payment will be debited from your bank account. ');
    dashboardPage.editBankSection().click();
    cy.contains('Edit your bank account details');
    cy.contains('Here, you can either change your primary account, or set up a new one and set it as primary. You can also delete unused accounts, if need be');
    dashboardPage.addBankBtn().should('be.visible');
    dashboardPage.existingAccountBox().should('be.visible');
    dashboardPage.doneBtn().click();
  });

  it("TC9 - Verify account shows fuel savings section", function () {
    cy.contains(' Fuel Savings ');
    cy.contains('Last Month');
    cy.contains('Total Savings');
    cy.contains('Your savings will be transferred to your primary account on the 1st and the 16th of each month.');
    dashboardPage.viewDepositsButton().click();
    cy.contains('Here’s how much you saved using your fleet cards.');
    dashboardPage.goToSavingsButton().click();
    cy.url().should("include", "/savings");
  });
});
