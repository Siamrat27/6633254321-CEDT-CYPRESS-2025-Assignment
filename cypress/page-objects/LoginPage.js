// cypress/page-objects/LoginPage.js
class LoginPage {
  user = "#user_login";
  pass = "#user_password";
  submit = 'input[name="submit"]';
  alertError = ".alert-error";

  visit() {
    cy.visit("/login.html");
  }
  typeUsername(v) {
    cy.get(this.user).clear().type(v);
  }
  typePassword(v) {
    cy.get(this.pass).clear().type(v, { log: false });
  }
  submitForm() {
    cy.get(this.submit).click();
  }
  login(u, p) {
    this.typeUsername(u);
    this.typePassword(p);
    this.submitForm();
  }
  errorShouldBeVisible() {
    cy.get(this.alertError)
      .should("be.visible")
      .and("contain", "Login and/or password are wrong.");
  }
}
module.exports = { LoginPage };
