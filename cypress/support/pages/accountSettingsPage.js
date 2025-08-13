class accountSettingsPage {
    accountSettingsOption = () => 'p:contains("Account Settings")';
    accountSettingsHeading = () => 'h2[data-cy="accountSettings-heading"]';
    spendLimitsTab = () => 'div[role="tab"]:contains("Spend Limits")';
    transactionLimitValue = () => 'p:contains("Transaction Limit") + p';
    notificationsTab = () => 'div[role="tab"]:contains("Notifications")';
    notificationsToggle = () => 'label.switch input[type="checkbox"]';
    toastMessage = () => '.toast:contains("Notifications preferences updated")';



    clickAccountSettingsOption() {
        cy.contains('p', 'Account Settings', { timeout: 60000 }).should('be.visible').click();
    }
    verifyAccountSettingsHeading() {
        cy.get(this.accountSettingsHeading(), { timeout: 60000 }).should('be.visible').and('have.text', ' Account Settings ');
    }
    clickSpendLimitsTab() {
        cy.get(this.spendLimitsTab(), { timeout: 60000 }).should('be.visible').click();
    }
    verifySpendLimitsValues() {
        cy.get(this.creditLineValue()).should('be.visible').and('have.text', '$2,500');
        cy.get(this.dailyLimitValue()).should('be.visible').and('have.text', '$1,600.00');
        cy.get(this.transactionLimitValue()).should('be.visible').and('have.text', '$1,600.00');
    }
    clickNotificationsTab() {
        cy.get(this.notificationsTab()).click({ force: true });
    }
    clickNotificationsToggle() {
        cy.get(this.notificationsToggle()).click({ force: true }); 
    }

    verifyNotificationsToast() {
        cy.contains('Notifications preferences updated', { timeout: 3000 }).should('exist');
    }
}
export default new accountSettingsPage();



