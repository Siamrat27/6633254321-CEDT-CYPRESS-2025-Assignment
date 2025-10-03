// cypress/page-objects/HomePage.js
class HomePage {
  accountSummaryTab = "#account_summary_tab";
  shouldBeLoggedIn() {
    cy.url().should("include", "/bank/account-summary.html");
    cy.get(this.accountSummaryTab).should("be.visible");
  }
}
module.exports = { HomePage };
